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

    // Only enforce validation if the allowed_students table has entries
    if (allowedStudents && allowedStudents.length > 0) {
      const { data: allowed } = await supabase
        .from('allowed_students')
        .select('student_name')
        .ilike('roll_number', rollNumber)
        .single();

      if (!allowed) {
        return NextResponse.json({ error: 'Your roll number is not registered for this exam. Contact your instructor.' }, { status: 403 });
      }

      // Validate name matches (case-insensitive)
      if (allowed.student_name.toLowerCase().trim() !== name.toLowerCase().trim()) {
        return NextResponse.json({ error: 'Name does not match the registered name for this roll number.' }, { status: 403 });
      }
    }

    // Check if student already has an active submission today
    const today = new Date().toISOString().split('T')[0];
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('roll_number', rollNumber)
      .eq('exam_date', today)
      .eq('is_active', true);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'You have already taken the exam today.' }, { status: 403 });
    }

    const questionsPerExam = config?.questions_per_exam || parseInt(process.env.QUESTIONS_PER_EXAM || '20');
    const timePerQuestion = config?.time_per_question || parseInt(process.env.TIME_PER_QUESTION || '120');

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

    return NextResponse.json({
      questions,
      timePerQuestion,
      totalQuestions: questionsPerExam,
    });
  } catch (err) {
    console.error('Start exam error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
