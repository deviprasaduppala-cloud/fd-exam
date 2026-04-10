import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { sessionId, rollNumber, answers, timeRemaining, currentQuestion, tabSwitches, fullscreenExits } = await request.json();

    if (!sessionId || !rollNumber) {
      return NextResponse.json({ error: 'Missing session data.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('exam_sessions')
      .update({
        answers: answers || {},
        time_remaining: timeRemaining || {},
        current_question: currentQuestion || 0,
        tab_switches: tabSwitches || 0,
        fullscreen_exits: fullscreenExits || 0,
        last_active_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .eq('roll_number', rollNumber)
      .eq('is_completed', false);

    if (error) {
      console.error('Save progress error:', error);
      return NextResponse.json({ error: 'Failed to save progress.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Save progress error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
