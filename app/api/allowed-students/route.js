import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all allowed students
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('allowed_students')
    .select('*')
    .order('roll_number', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch students.' }, { status: 500 });
  }

  return NextResponse.json({ students: data || [] });
}

// POST: Add student(s) — supports single and bulk
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, students } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!students || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ error: 'Provide an array of students.' }, { status: 400 });
    }

    // Validate each student
    const valid = [];
    const errors = [];
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      if (!s.roll_number || !s.student_name) {
        errors.push(`Row ${i + 1}: Missing roll_number or student_name`);
      } else {
        valid.push({
          roll_number: s.roll_number.toString().trim(),
          student_name: s.student_name.toString().trim(),
          email: s.email ? s.email.toString().trim() : null,
        });
      }
    }

    if (valid.length === 0) {
      return NextResponse.json({ error: 'No valid students to add.', details: errors }, { status: 400 });
    }

    // Upsert to handle duplicates gracefully
    const { data, error } = await supabase
      .from('allowed_students')
      .upsert(valid, { onConflict: 'roll_number', ignoreDuplicates: false })
      .select();

    if (error) {
      return NextResponse.json({ error: 'Failed to add students.', details: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      added: data?.length || 0,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE: Remove a student
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    const id = searchParams.get('id');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (id === 'all') {
      const { error } = await supabase
        .from('allowed_students')
        .delete()
        .neq('id', 0); // delete all
      if (error) {
        return NextResponse.json({ error: 'Failed to clear students.' }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: 'Provide student id.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('allowed_students')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete student.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
