-- ============================================================
-- ONLINE EXAM APP — DATABASE SCHEMA
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- Table to store exam submissions
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 20,
  percentage NUMERIC(5,2) NOT NULL,
  answers JSONB NOT NULL,
  tab_switches INTEGER NOT NULL DEFAULT 0,
  fullscreen_exits INTEGER NOT NULL DEFAULT 0,
  time_per_question JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  exam_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table to store exam configuration
CREATE TABLE exam_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  exam_enabled BOOLEAN NOT NULL DEFAULT false,
  exam_title TEXT DEFAULT 'Financial Derivatives Assessment',   -- CHANGE THIS to your course name
  show_results_to_students BOOLEAN NOT NULL DEFAULT false,
  time_per_question INTEGER NOT NULL DEFAULT 120,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default config (exam starts DISABLED — you enable it from admin dashboard)
INSERT INTO exam_config (id, exam_enabled, exam_title, show_results_to_students, time_per_question)
VALUES (1, false, 'Financial Derivatives Assessment', false, 120)           -- CHANGE THIS to your course name
ON CONFLICT (id) DO NOTHING;

-- Table to store allowed students (for roll number validation)
CREATE TABLE allowed_students (
  id BIGSERIAL PRIMARY KEY,
  roll_number TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_allowed_students_roll ON allowed_students(roll_number);

-- Create indexes for faster lookups
CREATE INDEX idx_submissions_roll ON submissions(roll_number);
CREATE INDEX idx_submissions_date ON submissions(exam_date);

-- Row Level Security (allow all operations via anon key for simplicity)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on submissions" ON submissions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on exam_config" ON exam_config
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE allowed_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on allowed_students" ON allowed_students
  FOR ALL USING (true) WITH CHECK (true);
