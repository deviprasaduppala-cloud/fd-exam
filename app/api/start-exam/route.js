import { NextResponse } from 'next/server';
import { getRandomQuestions } from '@/lib/questions';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { name, rollNumber } = await request.json();

    if (!name || !rollNumber) {
      return NextResponse.json({ error: 'Name and roll number are required.' }, { status: 400 });
    }

    // Check if exam is enabled and get config
    const { data: config } = await supabase
      .from('exam_config')
      .select('exam_enabled, time_per_question, questions_per_exam')
      .eq('id', 1)
      .single();

    if (config && !config.exam_enabled) {
      return NextResponse.json({ error: 'The exam is currently not active.' }, { status: 403 });
    }

    // Validate student against allowed list
    const { data: allowedStudents } = await supabase
      .from('allowed_students')
      .select('roll_number, student_name')
      .limit(1);

    if (allowedStudents && allowedStudents.length > 0) {
      const { data: allowed } = await supabase
        .from('allowed_students')
        .select('student_name')
        .ilike('roll_number', rollNumber)
        .single();

      if (!allowed) {
        return NextResponse.json({ error: 'Your roll number is not registered for this exam. Contact your instructor.' }, { status: 403 });
      }

      if (allowed.student_name.toLowerCase().trim() !== name.toLowerCase().trim()) {
        return NextResponse.json({ error: 'Name does not match the registered name for this roll number.' }, { status: 403 });
      }
    }

    const today = new Date().toISOString().split('T')[0];
    const questionsPerExam = config?.questions_per_exam || parseInt(process.env.QUESTIONS_PER_EXAM || '20');
    const timePerQuestion = config?.time_per_question || parseInt(process.env.TIME_PER_QUESTION || '120');

    // Check if student already has an active (completed) submission today
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('roll_number', rollNumber)
      .eq('exam_date', today)
      .eq('is_active', true);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'You have already taken the exam today.' }, { status: 403 });
    }

    // Check for an existing in-progress session (not completed)
    const { data: activeSession } = await supabase
      .from('exam_sessions')
      .select('*')
      .eq('roll_number', rollNumber)
      .eq('exam_date', today)
      .eq('is_completed', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (activeSession) {
      // Check if the session has expired (all time used up)
      const timeRemaining = activeSession.time_remaining || {};
      const totalRemaining = Object.values(timeRemaining).reduce((sum, t) => sum + Math.max(0, t), 0);

      // Also check absolute time limit: started_at + (timePerQuestion * numQuestions) with 2x buffer
      const maxDurationMs = activeSession.time_per_question * Object.keys(timeRemaining).length * 2 * 1000;
      const elapsedMs = Date.now() - new Date(activeSession.started_at).getTime();
      const hardExpired = elapsedMs > maxDurationMs;

      if (totalRemaining <= 0 || hardExpired) {
        // Session expired — auto-submit with whatever answers exist
        await autoSubmitSession(activeSession);
        return NextResponse.json({ error: 'Your previous exam session has expired and been auto-submitted. Contact your instructor for a re-attempt.' }, { status: 403 });
      }

      // Resume the active session — deduct elapsed time for the current question
      const lastActiveAt = new Date(activeSession.last_active_at).getTime();
      const elapsedSinceLastSave = Math.floor((Date.now() - lastActiveAt) / 1000);
      const currentQ = activeSession.current_question || 0;

      // Deduct time from the question the student was viewing when they left
      const adjustedTimeRemaining = { ...timeRemaining };
      if (adjustedTimeRemaining[currentQ] !== undefined) {
        adjustedTimeRemaining[currentQ] = Math.max(0, adjustedTimeRemaining[currentQ] - elapsedSinceLastSave);
      }

      // Update last_active_at
      await supabase
        .from('exam_sessions')
        .update({ last_active_at: new Date().toISOString(), time_remaining: adjustedTimeRemaining })
        .eq('id', activeSession.id);

      return NextResponse.json({
        questions: activeSession.questions,
        timePerQuestion: activeSession.time_per_question,
        totalQuestions: activeSession.questions.length,
        resuming: true,
        sessionId: activeSession.id,
        savedAnswers: activeSession.answers || {},
        savedTimers: adjustedTimeRemaining,
        savedCurrentQuestion: currentQ,
        tabSwitches: activeSession.tab_switches || 0,
        fullscreenExits: activeSession.fullscreen_exits || 0,
      });
    }

    // No active session — create a new one
    // Get question IDs from previous attempts to exclude repeats
    const { data: previousSubmissions } = await supabase
      .from('submissions')
      .select('answers')
      .eq('roll_number', rollNumber);

    const previousQuestionIds = new Set();
    if (previousSubmissions) {
      previousSubmissions.forEach(sub => {
        if (sub.answers && Array.isArray(sub.answers)) {
          sub.answers.forEach(ans => {
            if (ans.questionId) previousQuestionIds.add(ans.questionId);
          });
        }
      });
    }

    const questions = getRandomQuestions(questionsPerExam, previousQuestionIds);

    // Initialize time remaining for each question
    const initialTimers = {};
    questions.forEach((_, i) => {
      initialTimers[i] = timePerQuestion;
    });

    // Create exam session in DB
    const { data: newSession, error: sessionError } = await supabase
      .from('exam_sessions')
      .insert({
        roll_number: rollNumber,
        student_name: name,
        questions,
        answers: {},
        time_remaining: initialTimers,
        current_question: 0,
        time_per_question: timePerQuestion,
        exam_date: today,
      })
      .select('id')
      .single();

    if (sessionError) {
      console.error('Session create error:', sessionError);
    }

    return NextResponse.json({
      questions,
      timePerQuestion,
      totalQuestions: questionsPerExam,
      resuming: false,
      sessionId: newSession?.id || null,
    });
  } catch (err) {
    console.error('Start exam error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// Auto-submit an expired session
async function autoSubmitSession(session) {
  const questions = session.questions || [];
  const savedAnswers = session.answers || {};
  let score = 0;

  const detailedAnswers = questions.map((q, i) => {
    const selected = savedAnswers[i] !== undefined ? savedAnswers[i] : -1;
    const isCorrect = selected === q.correct;
    if (isCorrect) score++;

    return {
      questionId: q.id,
      questionText: q.question,
      topic: q.topic,
      session: q.session,
      options: q.options,
      selectedAnswer: selected,
      correctAnswer: q.correct,
      isCorrect,
      timeSpent: session.time_per_question,
      explanation: q.explanation,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(1) : '0.0';

  // Insert submission
  await supabase.from('submissions').insert({
    student_name: session.student_name,
    roll_number: session.roll_number,
    score,
    total_questions: totalQuestions,
    percentage: parseFloat(percentage),
    answers: detailedAnswers,
    tab_switches: session.tab_switches || 0,
    fullscreen_exits: session.fullscreen_exits || 0,
    time_per_question: session.time_remaining,
    exam_date: session.exam_date,
  });

  // Mark session as completed
  await supabase
    .from('exam_sessions')
    .update({ is_completed: true })
    .eq('id', session.id);
}
