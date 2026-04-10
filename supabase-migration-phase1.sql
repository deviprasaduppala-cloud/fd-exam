-- Phase 1 Migration: Run this in Supabase SQL Editor if you already have the base schema
-- This adds: timer customization, review toggle, allowed students, and is_active for re-attempts

-- 1. Add new columns to exam_config
ALTER TABLE exam_config ADD COLUMN IF NOT EXISTS show_results_to_students BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE exam_config ADD COLUMN IF NOT EXISTS time_per_question INTEGER NOT NULL DEFAULT 120;

-- 2. Add is_active column to submissions (for re-attempt history preservation)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- 3. Create allowed_students table
CREATE TABLE IF NOT EXISTS allowed_students (
  id BIGSERIAL PRIMARY KEY,
  roll_number TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_allowed_students_roll ON allowed_students(roll_number);

ALTER TABLE allowed_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on allowed_students" ON allowed_students
  FOR ALL USING (true) WITH CHECK (true);
