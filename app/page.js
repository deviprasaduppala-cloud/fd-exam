'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [examStatus, setExamStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/exam-status')
      .then(r => r.json())
      .then(data => setExamStatus(data))
      .catch(() => setExamStatus({ enabled: false, timePerQuestion: 120 }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !rollNumber.trim()) {
      setError('Please enter both your name and roll number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/start-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), rollNumber: rollNumber.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to start exam.');
        setLoading(false);
        return;
      }

      // Store exam data in sessionStorage
      sessionStorage.setItem('examData', JSON.stringify({
        name: name.trim(),
        rollNumber: rollNumber.trim(),
        questions: data.questions,
        startTime: Date.now(),
        timePerQuestion: data.timePerQuestion,
      }));

      router.push('/exam');
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          {/* CUSTOMIZE: Change module code, course name, and unit below */}
          <div className="text-sm font-medium text-blue-600 mb-1">Financial Derivatives</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Financial Derivatives
          </h1>
          <p className="text-gray-500 text-sm">Assessment</p>
        </div>

        {examStatus && !examStatus.enabled ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <p className="text-amber-800 font-medium">The exam is currently not active.</p>
            <p className="text-amber-600 text-sm mt-1">Please wait for your instructor to enable the assessment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                placeholder="Enter your full name"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                placeholder="Enter your roll number"
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading Questions...' : 'Start Assessment'}
            </button>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-700">Instructions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>20 MCQ questions with <strong>{examStatus?.timePerQuestion || 120} seconds per question</strong></li>
                <li>Each question has its own independent timer</li>
                <li>You may skip a question and return later — the timer for that question <strong>pauses when you leave it</strong> and <strong>resumes when you return</strong></li>
                <li>If a question's timer runs out, you cannot answer it anymore</li>
                <li>Use the question navigation panel to jump between questions</li>
                <li>The exam runs in <strong>fullscreen mode</strong> — do not exit</li>
                <li>Switching tabs or windows is <strong>monitored and logged</strong></li>
                <li>All questions must be submitted at the end — unanswered questions are marked incorrect</li>
                <li>Scores are shown immediately after submission</li>
              </ul>
            </div>
          </form>
        )}


      </div>
    </div>
  );
}
