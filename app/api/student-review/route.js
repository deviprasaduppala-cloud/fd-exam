import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { name, rollNumber } = await request.json();

    if (!name || !rollNumber) {
      return NextResponse.json({ error: 'Name and roll number are required.' }, { status: 400 });
    }

    // Check if review is enabled by admin
    const { data: config } = await supabase
      .from('exam_config')
      .select('show_results_to_students')
      .eq('id', 1)
      .single();

    if (!config || !config.show_results_to_students) {
      return NextResponse.json({ error: 'Answer review is not currently available. Please check with your instructor.' }, { status: 403 });
    }

    // Fetch the student's most recent active submission
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('*')
      .ilike('roll_number', rollNumber.trim())
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !submissions || submissions.length === 0) {
      return NextResponse.json({ error: 'No submission found for this roll number.' }, { status: 404 });
    }

    const submission = submissions[0];

    // Validate name matches
    if (submission.student_name.toLowerCase().trim() !== name.toLowerCase().trim()) {
      return NextResponse.json({ error: 'Name does not match the submission record.' }, { status: 403 });
    }

    return NextResponse.json({
      studentName: submission.student_name,
      rollNumber: submission.roll_number,
      score: submission.score,
      totalQuestions: submission.total_questions,
      percentage: submission.percentage,
      answers: submission.answers,
      examDate: submission.exam_date,
      submittedAt: submission.created_at,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
