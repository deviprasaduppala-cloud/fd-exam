'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Calculator from '../components/Calculator';

export default function ExamPage() {
  const router = useRouter();
  const [examData, setExamData] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timers, setTimers] = useState({});
  const [tabSwitches, setTabSwitches] = useState(0);
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [warning, setWarning] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef({});

  // Load exam data
  useEffect(() => {
    const stored = sessionStorage.getItem('examData');
    if (!stored) {
      router.push('/');
      return;
    }
    const data = JSON.parse(stored);
    setExamData(data);

    // Initialize timers for each question
    const initialTimers = {};
    data.questions.forEach((_, i) => {
      initialTimers[i] = data.timePerQuestion;
    });
    setTimers(initialTimers);
  }, [router]);

  // Timer countdown for current question
  useEffect(() => {
    if (!examData) return;

    timerRef.current = setInterval(() => {
      setTimers(prev => {
        const newTimers = { ...prev };
        if (newTimers[currentQ] > 0) {
          newTimers[currentQ] = newTimers[currentQ] - 1;
        }
        return newTimers;
      });
    }, 1000);

    startTimeRef.current[currentQ] = startTimeRef.current[currentQ] || Date.now();

    return () => clearInterval(timerRef.current);
  }, [currentQ, examData]);

  // Check if all timers expired
  useEffect(() => {
    if (!examData) return;
    const allExpired = Object.values(timers).every(t => t <= 0);
    if (allExpired && !submitting) {
      handleSubmit();
    }
  }, [timers, examData, submitting]);

  // Reusable warning function
  const fullscreenReady = useRef(false);
  const warningTimerRef = useRef(null);

  const showWarning = useCallback((msg) => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setWarning(msg);
    warningTimerRef.current = setTimeout(() => setWarning(''), 5000);
  }, []);

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        showWarning('You left the exam tab. This has been recorded.');
      }
    };

    const handleBlur = () => {
      setTabSwitches(prev => prev + 1);
      showWarning('Focus lost from exam window. This has been recorded.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [showWarning]);

  // Fullscreen management
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (e) {
        fullscreenReady.current = true;
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        fullscreenReady.current = true;
      } else if (fullscreenReady.current) {
        setFullscreenExits(prev => prev + 1);
        showWarning('You exited fullscreen. This has been recorded. Press F11 to return.');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Disable right-click and copy/paste
  useEffect(() => {
    const preventContext = (e) => e.preventDefault();
    const preventCopy = (e) => e.preventDefault();
    const preventKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'u', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContext);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('keydown', preventKeys);

    return () => {
      document.removeEventListener('contextmenu', preventContext);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('keydown', preventKeys);
    };
  }, []);

  const selectAnswer = (questionIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const goToQuestion = (index) => {
    setCurrentQ(index);
  };

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    const questions = examData.questions;
    let score = 0;
    const detailedAnswers = questions.map((q, i) => {
      const selected = answers[i] !== undefined ? answers[i] : -1;
      const isCorrect = selected === q.correct;
      if (isCorrect) score++;

      return {
        questionId: q.id,
        questionText: q.question,
        topic: q.topic,
        session: q.session,
        options: q.options,
        selectedAnswer: selected,
        correctAnswer: q.correct,
        isCorrect,
        timeSpent: examData.timePerQuestion - (timers[i] || 0),
        explanation: q.explanation,
      };
    });

    const submission = {
      name: examData.name,
      rollNumber: examData.rollNumber,
      score,
      totalQuestions: questions.length,
      percentage: ((score / questions.length) * 100).toFixed(1),
      answers: detailedAnswers,
      tabSwitches,
      fullscreenExits,
      timePerQuestion: Object.entries(timers).map(([i, remaining]) => ({
        question: parseInt(i),
        timeSpent: examData.timePerQuestion - remaining,
        timeRemaining: remaining,
      })),
    };

    try {
      await fetch('/api/submit-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error('Submit error:', err);
    }

    sessionStorage.setItem('examResult', JSON.stringify(submission));
    sessionStorage.removeItem('examData');
    router.push('/results');
  }, [examData, answers, timers, tabSwitches, fullscreenExits, submitting, router]);

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading exam...</div>
      </div>
    );
  }

  const questions = examData.questions;
  const currentQuestion = questions[currentQ];
  const timeLeft = timers[currentQ] || 0;
  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeLeft <= 30;

  return (
    <div className="min-h-screen bg-gray-100 select-none" style={{ userSelect: 'none' }}>
      {/* Calculator */}
      {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}

      {/* Warning Banner */}
      {warning && <div className="lockdown-warning">{warning}</div>}

      {/* Submit Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Assessment?</h3>
            <p className="text-gray-600 mb-1">
              You have answered <span className="font-bold text-green-600">{answeredCount}</span> out of <span className="font-bold">{questions.length}</span> questions.
            </p>
            {answeredCount < questions.length && (
              <p className="text-amber-600 text-sm mb-4">
                {questions.length - answeredCount} question(s) are unanswered and will be marked incorrect.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Go Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <div className="hidden md:block">
            <span className="text-sm text-gray-500">Financial Derivatives</span>
            <span className="text-sm text-gray-400 ml-2">|</span>
            <span className="text-sm text-gray-600 ml-2 font-medium">{examData.name}</span>
            <span className="text-sm text-gray-400 ml-1">({examData.rollNumber})</span>
          </div>
          <div className="md:hidden text-xs text-gray-500 truncate max-w-[150px]">{examData.name}</div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-xs md:text-sm text-gray-500">
              {answeredCount}/{questions.length}
            </div>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition ${
                showCalculator
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Toggle calculator"
            >
              Calc
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Question Navigation - horizontal scroll */}
      <div className="md:hidden bg-white border-b sticky top-[41px] z-30 px-3 py-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {questions.map((_, i) => {
            let status = 'unattempted';
            if (answers[i] !== undefined) status = 'answered';
            else if (timers[i] < examData.timePerQuestion && timers[i] > 0) status = 'skipped';
            if (i === currentQ) status += ' current';

            return (
              <button
                key={i}
                onClick={() => goToQuestion(i)}
                className={`question-nav-btn shrink-0 w-8 h-8 text-xs ${status}`}
                disabled={timers[i] <= 0 && answers[i] === undefined}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 md:px-4 py-4 md:py-6 flex gap-6">
        {/* Question Navigation Sidebar - desktop only */}
        <div className="w-48 shrink-0 hidden md:block">
          <div className="bg-white rounded-xl shadow p-4 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Questions</h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, i) => {
                let status = 'unattempted';
                if (answers[i] !== undefined) status = 'answered';
                else if (timers[i] < examData.timePerQuestion && timers[i] > 0) status = 'skipped';
                if (i === currentQ) status += ' current';

                return (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`question-nav-btn ${status}`}
                    disabled={timers[i] <= 0 && answers[i] === undefined}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green-500 inline-block"></span> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-yellow-400 inline-block"></span> Visited
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-gray-200 inline-block"></span> Not visited
              </div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            {/* Timer */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500 font-medium">
                Question {currentQ + 1} of {questions.length}
              </span>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${
                isTimeCritical ? 'bg-red-100 text-red-700 timer-warning' : 'bg-blue-50 text-blue-700'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
              <div
                className={`h-1.5 rounded-full transition-all duration-1000 ${isTimeCritical ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(timeLeft / examData.timePerQuestion) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            {timeLeft > 0 ? (
              <>
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-2 md:space-y-3">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(currentQ, i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQ] === i
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold ${
                        answers[currentQ] === i
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl font-semibold">Time expired for this question</p>
                {answers[currentQ] !== undefined ? (
                  <p className="mt-2 text-green-600">Your answer has been recorded.</p>
                ) : (
                  <p className="mt-2 text-red-500">No answer recorded.</p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={() => goToQuestion(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <div className="flex gap-3">
                {currentQ < questions.length - 1 ? (
                  <button
                    onClick={() => goToQuestion(currentQ + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    {answers[currentQ] !== undefined ? 'Next' : 'Skip & Next'}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Finish & Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button — always visible at the bottom */}
          <div className="mt-4 bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">{answeredCount}</span> of{' '}
              <span className="font-medium text-gray-700">{questions.length}</span> answered
              {answeredCount < questions.length && (
                <span className="text-amber-600 ml-2">({questions.length - answeredCount} remaining)</span>
              )}
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
            >
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
