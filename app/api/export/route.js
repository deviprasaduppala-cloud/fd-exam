import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const date = searchParams.get('date');

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: true });

  if (date) {
    query = query.eq('exam_date', date);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch results.' }, { status: 500 });
  }

  return NextResponse.json({ submissions: data || [] });
}
