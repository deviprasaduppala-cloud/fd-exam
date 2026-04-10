import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { password, submissionId, rollNumber, date } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (submissionId) {
      // Mark submission as inactive (preserves history)
      const { error } = await supabase
        .from('submissions')
        .update({ is_active: false })
        .eq('id', submissionId);

      if (error) {
        return NextResponse.json({ error: 'Failed to allow re-attempt.' }, { status: 500 });
      }
    } else if (rollNumber && date) {
      // Mark by roll number and date
      const { error } = await supabase
        .from('submissions')
        .update({ is_active: false })
        .eq('roll_number', rollNumber)
        .eq('exam_date', date);

      if (error) {
        return NextResponse.json({ error: 'Failed to allow re-attempt.' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Provide submissionId or rollNumber+date.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
