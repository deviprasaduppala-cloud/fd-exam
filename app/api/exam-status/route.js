import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('exam_config')
      .select('exam_enabled, exam_title, show_results_to_students, time_per_question')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return NextResponse.json({ enabled: false, title: 'Financial Derivatives Assessment', showResultsToStudents: false, timePerQuestion: 120 });
    }

    return NextResponse.json({
      enabled: data.exam_enabled,
      title: data.exam_title,
      showResultsToStudents: data.show_results_to_students,
      timePerQuestion: data.time_per_question,
    });
  } catch {
    return NextResponse.json({ enabled: false, title: 'Financial Derivatives Assessment', showResultsToStudents: false, timePerQuestion: 120 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = { updated_at: new Date().toISOString() };
    if (body.enabled !== undefined) updates.exam_enabled = body.enabled;
    if (body.showResultsToStudents !== undefined) updates.show_results_to_students = body.showResultsToStudents;
    if (body.timePerQuestion !== undefined) updates.time_per_question = body.timePerQuestion;

    const { error } = await supabase
      .from('exam_config')
      .update(updates)
      .eq('id', 1);

    if (error) {
      return NextResponse.json({ error: 'Failed to update config.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
