import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { rollNumber } = await request.json();

    if (!rollNumber) {
      return NextResponse.json({ error: 'Roll number is required.' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    // Get all active submissions for today, sorted by percentage descending
    const { data: allSubmissions, error } = await supabase
      .from('submissions')
      .select('roll_number, percentage, score, total_questions')
      .eq('exam_date', today)
      .eq('is_active', true)
      .order('percentage', { ascending: false });

    if (error || !allSubmissions || allSubmissions.length === 0) {
      return NextResponse.json({ rank: null, total: 0, percentile: null });
    }

    const totalStudents = allSubmissions.length;

    // Find this student's rank (1-based)
    const studentIndex = allSubmissions.findIndex(
      s => s.roll_number.toLowerCase() === rollNumber.toLowerCase()
    );

    if (studentIndex === -1) {
      return NextResponse.json({ rank: null, total: totalStudents, percentile: null });
    }

    const rank = studentIndex + 1;
    // Percentile = percentage of students scored BELOW this student
    const percentile = totalStudents > 1
      ? (((totalStudents - rank) / (totalStudents - 1)) * 100).toFixed(1)
      : '100.0';

    // Class statistics
    const scores = allSubmissions.map(s => parseFloat(s.percentage));
    const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    const highestScore = scores[0].toFixed(1);
    const lowestScore = scores[scores.length - 1].toFixed(1);
    const median = scores.length % 2 === 0
      ? ((scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2).toFixed(1)
      : scores[Math.floor(scores.length / 2)].toFixed(1);

    return NextResponse.json({
      rank,
      total: totalStudents,
      percentile,
      classStats: {
        average: avgScore,
        highest: highestScore,
        lowest: lowestScore,
        median,
      },
    });
  } catch (err) {
    console.error('Rank error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
