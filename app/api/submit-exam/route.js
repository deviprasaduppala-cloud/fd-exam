import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, rollNumber, score, totalQuestions, percentage, answers, tabSwitches, fullscreenExits, timePerQuestion } = body;

    if (!name || !rollNumber || score === undefined) {
      return NextResponse.json({ error: 'Invalid submission data.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('submissions')
      .insert({
        student_name: name,
        roll_number: rollNumber,
        score,
        total_questions: totalQuestions,
        percentage: parseFloat(percentage),
        answers,
        tab_switches: tabSwitches || 0,
        fullscreen_exits: fullscreenExits || 0,
        time_per_question: timePerQuestion,
        exam_date: new Date().toISOString().split('T')[0],
      })
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.[0]?.id });
  } catch (err) {
    console.error('Submit exam error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
