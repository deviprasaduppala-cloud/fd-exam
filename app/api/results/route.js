import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const date = searchParams.get('date');

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const showInactive = searchParams.get('showInactive') === 'true';

  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (!showInactive) {
    query = query.eq('is_active', true);
  }

  if (date) {
    query = query.eq('exam_date', date);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch results.' }, { status: 500 });
  }

  // Compute analytics
  const submissions = data || [];
  const scores = submissions.map(s => s.score);
  const analytics = {
    totalSubmissions: submissions.length,
    averageScore: scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0,
    highestScore: scores.length ? Math.max(...scores) : 0,
    lowestScore: scores.length ? Math.min(...scores) : 0,
    averagePercentage: submissions.length
      ? (submissions.reduce((a, s) => a + parseFloat(s.percentage), 0) / submissions.length).toFixed(1)
      : 0,
    passRate: submissions.length
      ? ((submissions.filter(s => parseFloat(s.percentage) >= 50).length / submissions.length) * 100).toFixed(1)
      : 0,
  };

  // Question-wise analysis
  const questionStats = {};
  submissions.forEach(sub => {
    if (sub.answers && Array.isArray(sub.answers)) {
      sub.answers.forEach(ans => {
        const qId = ans.questionId;
        if (!questionStats[qId]) {
          questionStats[qId] = { id: qId, topic: ans.topic, question: ans.questionText, correct: 0, incorrect: 0, unanswered: 0, total: 0 };
        }
        questionStats[qId].total++;
        if (ans.selectedAnswer === -1) questionStats[qId].unanswered++;
        else if (ans.isCorrect) questionStats[qId].correct++;
        else questionStats[qId].incorrect++;
      });
    }
  });

  // Sort by difficulty (lowest correct rate first)
  const questionAnalysis = Object.values(questionStats)
    .map(q => ({ ...q, correctRate: q.total ? ((q.correct / q.total) * 100).toFixed(1) : 0 }))
    .sort((a, b) => parseFloat(a.correctRate) - parseFloat(b.correctRate));

  return NextResponse.json({
    submissions,
    analytics,
    questionAnalysis,
  });
}
