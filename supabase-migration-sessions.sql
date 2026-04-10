-- ============================================================
-- MIGRATION: Add exam_sessions table + ranking support
-- ============================================================
-- Run this in your Supabase SQL Editor for the FD exam project.
-- This adds server-side exam session persistence so:
--   1. If a student closes the browser, they can resume with correct remaining time
--   2. Abandoned exams are auto-submitted when they expire
--   3. Students see their rank/percentile after submitting
-- ============================================================

-- Table to track in-progress exams
CREATE TABLE IF NOT EXISTS exam_sessions (
  id BIGSERIAL PRIMARY KEY,
  roll_number TEXT NOT NULL,
  student_name TEXT NOT NULL,
  questions JSONB NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  time_remaining JSONB NOT NULL DEFAULT '{}',
  current_question INTEGER NOT NULL DEFAULT 0,
  tab_switches INTEGER NOT NULL DEFAULT 0,
  fullscreen_exits INTEGER NOT NULL DEFAULT 0,
  time_per_question INTEGER NOT NULL DEFAULT 120,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_completed BOOLEAN NOT NULL DEFAULT false,
  exam_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_exam_sessions_roll ON exam_sessions(roll_number);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_active ON exam_sessions(roll_number, exam_date, is_completed);

-- RLS
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on exam_sessions" ON exam_sessions
  FOR ALL USING (true) WITH CHECK (true);
