'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const [reviewEnabled, setReviewEnabled] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('examResult');
    if (!stored) {
      router.push('/');
      return;
    }
    setResult(JSON.parse(stored));

    fetch('/api/exam-status')
      .then(r => r.json())
      .then(data => setReviewEnabled(data.showResultsToStudents || false))
      .catch(() => {});
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading results...</div>
      </div>
    );
  }

  const percentage = parseFloat(result.percentage);
  const passed = percentage >= 50;
  const answers = result.answers || [];
  const correctCount = answers.filter(a => a.isCorrect).length;
  const wrongCount = answers.filter(a => !a.isCorrect && a.selectedAnswer !== -1).length;
  const skippedCount = answers.filter(a => a.selectedAnswer === -1).length;

  const filteredAnswers = answers.filter(a => {
    if (filter === 'correct') return a.isCorrect;
    if (filter === 'wrong') return !a.isCorrect && a.selectedAnswer !== -1;
    if (filter === 'skipped') return a.selectedAnswer === -1;
    return true;
  });

  // Topic-wise performance
  const topicStats = {};
  answers.forEach(a => {
    const topic = a.topic || 'General';
    if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
    topicStats[topic].total++;
    if (a.isCorrect) topicStats[topic].correct++;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-6">
          {/* CUSTOMIZE: Change module code and course name below */}
          <div className="text-sm text-blue-600 font-medium mb-1">Financial Derivatives | Assessment</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Assessment Complete</h1>

          <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full mb-6 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <div>
              <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {result.score}/{result.totalQuestions}
              </div>
              <div className={`text-lg font-semibold ${passed ? 'text-green-500' : 'text-red-500'}`}>
                {percentage}%
              </div>
            </div>
          </div>

          <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
            passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-500">Student</div>
              <div className="font-semibold text-gray-900">{result.name}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-500">Roll Number</div>
              <div className="font-semibold text-gray-900">{result.rollNumber}</div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-500">Correct</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
            <div className="text-sm text-gray-500">Incorrect</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{skippedCount}</div>
            <div className="text-sm text-gray-500">Unanswered</div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center text-sm text-blue-700 mb-6">
          Your detailed results have been submitted to your instructor.
          {reviewEnabled && !showReview && (
            <span> You may close this window or review your answers below.</span>
          )}
          {!reviewEnabled && (
            <span> You may close this window.</span>
          )}
        </div>

        {/* Review Section — only when admin has enabled it */}
        {reviewEnabled && !showReview && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowReview(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
            >
              Review My Answers with Explanations
            </button>
          </div>
        )}

        {reviewEnabled && showReview && (
          <>
            {/* Topic-wise Performance */}
            <div className="bg-white rounded-xl shadow p-5 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Performance by Topic</h3>
              <div className="space-y-2">
                {Object.entries(topicStats).map(([topic, stats]) => {
                  const pct = ((stats.correct / stats.total) * 100).toFixed(0);
                  return (
                    <div key={topic} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-40 truncate" title={topic}>{topic}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${parseFloat(pct) >= 70 ? 'bg-green-500' : parseFloat(pct) >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500 w-16 text-right">{stats.correct}/{stats.total} ({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { key: 'all', label: `All (${answers.length})`, color: 'blue' },
                { key: 'correct', label: `Correct (${correctCount})`, color: 'green' },
                { key: 'wrong', label: `Incorrect (${wrongCount})`, color: 'red' },
                { key: 'skipped', label: `Skipped (${skippedCount})`, color: 'gray' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    filter === f.key
                      ? f.color === 'blue' ? 'bg-blue-600 text-white'
                      : f.color === 'green' ? 'bg-green-600 text-white'
                      : f.color === 'red' ? 'bg-red-600 text-white'
                      : 'bg-gray-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Answer Review Cards */}
            <div className="space-y-4">
              {filteredAnswers.map((ans, idx) => {
                const qNum = answers.indexOf(ans) + 1;
                return (
                  <div key={idx} className={`bg-white rounded-xl shadow p-5 border-l-4 ${
                    ans.isCorrect ? 'border-green-500' :
                    ans.selectedAnswer === -1 ? 'border-gray-300' :
                    'border-red-500'
                  }`}>
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {ans.topic || `Session ${ans.session}`}
                          </span>
                          <span className="text-xs text-gray-400">{ans.timeSpent}s spent</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">Q{qNum}. {ans.questionText}</p>
                      </div>
                      <div className={`shrink-0 ml-3 px-2 py-1 rounded-md text-xs font-bold ${
                        ans.isCorrect ? 'bg-green-100 text-green-700' :
                        ans.selectedAnswer === -1 ? 'bg-gray-100 text-gray-500' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {ans.isCorrect ? 'CORRECT' : ans.selectedAnswer === -1 ? 'SKIPPED' : 'WRONG'}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mb-3">
                      {ans.options.map((opt, j) => {
                        const isCorrectOption = j === ans.correctAnswer;
                        const isSelected = j === ans.selectedAnswer;
                        const isWrongSelection = isSelected && !ans.isCorrect;

                        let optClass = 'border-gray-200 bg-white text-gray-600';
                        if (isCorrectOption) optClass = 'border-green-400 bg-green-50 text-green-800 font-medium';
                        if (isWrongSelection) optClass = 'border-red-400 bg-red-50 text-red-700 line-through';

                        return (
                          <div key={j} className={`flex items-center gap-2 p-2.5 rounded-lg border ${optClass}`}>
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                              isCorrectOption ? 'bg-green-500 text-white' :
                              isWrongSelection ? 'bg-red-500 text-white' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {String.fromCharCode(65 + j)}
                            </span>
                            <span className="text-sm">{opt}</span>
                            {isCorrectOption && <span className="ml-auto text-green-500 text-sm">&#10003;</span>}
                            {isWrongSelection && <span className="ml-auto text-red-500 text-sm">&#10007;</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Wrong answer summary */}
                    {!ans.isCorrect && ans.selectedAnswer !== -1 && (
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className="text-red-600">{String.fromCharCode(65 + ans.selectedAnswer)}. {ans.options[ans.selectedAnswer]}</span>
                        {' '}&rarr;{' '}
                        <span className="font-medium">Correct:</span>{' '}
                        <span className="text-green-600">{String.fromCharCode(65 + ans.correctAnswer)}. {ans.options[ans.correctAnswer]}</span>
                      </div>
                    )}

                    {/* Explanation */}
                    {ans.explanation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                        <div className="text-xs font-semibold text-blue-700 mb-1">Explanation</div>
                        <p className="text-sm text-blue-800">{ans.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredAnswers.length === 0 && (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                No questions match this filter.
              </div>
            )}
          </>
        )}

        {/* Exit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              sessionStorage.removeItem('examResult');
              sessionStorage.removeItem('examData');
              router.push('/');
            }}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
