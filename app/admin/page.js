'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examEnabled, setExamEnabled] = useState(false);
  const [showResultsToStudents, setShowResultsToStudents] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(120);
  const [timeInput, setTimeInput] = useState('120');
  const [questionsPerExam, setQuestionsPerExam] = useState(20);
  const [questionsInput, setQuestionsInput] = useState('20');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [tab, setTab] = useState('results');

  // Allowed students state
  const [allowedStudents, setAllowedStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ roll_number: '', student_name: '', email: '' });
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/results?password=${encodeURIComponent(password)}&date=${dateFilter}`);
      if (!res.ok) {
        setError('Invalid password');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data);
      setError('');
    } catch {
      setError('Failed to fetch results');
    }
    setLoading(false);
  }, [password, dateFilter]);

  const fetchAllowedStudents = useCallback(async () => {
    try {
      const res = await fetch(`/api/allowed-students?password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setAllowedStudents(data.students || []);
      }
    } catch { /* ignore */ }
  }, [password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthenticated(true);
    await fetchResults();
    const statusRes = await fetch('/api/exam-status');
    const status = await statusRes.json();
    setExamEnabled(status.enabled);
    setShowResultsToStudents(status.showResultsToStudents || false);
    setTimePerQuestion(status.timePerQuestion || 120);
    setTimeInput(String(status.timePerQuestion || 120));
    setQuestionsPerExam(status.questionsPerExam || 20);
    setQuestionsInput(String(status.questionsPerExam || 20));
    fetchAllowedStudents();
  };

  useEffect(() => {
    if (authenticated) {
      fetchResults();
    }
  }, [dateFilter, authenticated, fetchResults]);

  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(fetchResults, 30000);
    return () => clearInterval(interval);
  }, [authenticated, fetchResults]);

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    setResults(null);
    setSelectedStudent(null);
    setAllowedStudents([]);
    setExamEnabled(false);
    setShowResultsToStudents(false);
    setTimePerQuestion(120);
    setTimeInput('120');
    setQuestionsPerExam(20);
    setQuestionsInput('20');
    setError('');
    setTab('results');
  };

  const toggleExam = async () => {
    const newState = !examEnabled;
    try {
      const res = await fetch('/api/exam-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, enabled: newState }),
      });
      if (res.ok) setExamEnabled(newState);
    } catch {
      setError('Failed to toggle exam');
    }
  };

  const toggleReview = async () => {
    const newState = !showResultsToStudents;
    try {
      const res = await fetch('/api/exam-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, showResultsToStudents: newState }),
      });
      if (res.ok) setShowResultsToStudents(newState);
    } catch {
      setError('Failed to toggle review');
    }
  };

  const updateTimer = async () => {
    const val = parseInt(timeInput);
    if (isNaN(val) || val < 30 || val > 600) {
      alert('Timer must be between 30 and 600 seconds.');
      return;
    }
    try {
      const res = await fetch('/api/exam-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, timePerQuestion: val }),
      });
      if (res.ok) {
        setTimePerQuestion(val);
      }
    } catch {
      setError('Failed to update timer');
    }
  };

  const updateQuestionsCount = async () => {
    const val = parseInt(questionsInput);
    if (isNaN(val) || val < 5 || val > 100) {
      alert('Questions per exam must be between 5 and 100.');
      return;
    }
    try {
      const res = await fetch('/api/exam-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, questionsPerExam: val }),
      });
      if (res.ok) {
        setQuestionsPerExam(val);
      }
    } catch {
      setError('Failed to update questions count');
    }
  };

  const exportToExcel = async () => {
    try {
      const res = await fetch(`/api/export?password=${encodeURIComponent(password)}&date=${dateFilter}`);
      const data = await res.json();

      if (!data.submissions || data.submissions.length === 0) {
        alert('No data to export');
        return;
      }

      const rows = [['Name', 'Roll Number', 'Score', 'Total', 'Percentage', 'Tab Switches', 'Fullscreen Exits', 'Date', 'Time']];
      data.submissions.forEach(s => {
        rows.push([
          s.student_name, s.roll_number, s.score, s.total_questions,
          s.percentage + '%', s.tab_switches, s.fullscreen_exits,
          s.exam_date, new Date(s.created_at).toLocaleTimeString(),
        ]);
      });

      const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Exam_Results_${dateFilter}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export failed');
    }
  };

  const allowReattempt = async (submission) => {
    if (!confirm(`Allow re-attempt for ${submission.student_name} (${submission.roll_number})?\n\nTheir current submission will be marked inactive and they can take the exam again with new questions.`)) {
      return;
    }
    try {
      const res = await fetch('/api/allow-reattempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, submissionId: submission.id }),
      });
      if (res.ok) fetchResults();
      else alert('Failed to allow re-attempt');
    } catch {
      alert('Failed to allow re-attempt');
    }
  };

  // Allowed students handlers
  const addStudent = async () => {
    if (!newStudent.roll_number.trim() || !newStudent.student_name.trim()) {
      alert('Roll number and name are required.');
      return;
    }
    try {
      const res = await fetch('/api/allowed-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, students: [newStudent] }),
      });
      if (res.ok) {
        setNewStudent({ roll_number: '', student_name: '', email: '' });
        fetchAllowedStudents();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add student');
      }
    } catch {
      alert('Failed to add student');
    }
  };

  const removeStudent = async (id) => {
    if (!confirm('Remove this student from the allowed list?')) return;
    try {
      const res = await fetch(`/api/allowed-students?password=${encodeURIComponent(password)}&id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllowedStudents();
    } catch {
      alert('Failed to remove student');
    }
  };

  const clearAllStudents = async () => {
    if (!confirm('Remove ALL students from the allowed list? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/allowed-students?password=${encodeURIComponent(password)}&id=all`, { method: 'DELETE' });
      if (res.ok) fetchAllowedStudents();
    } catch {
      alert('Failed to clear students');
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('Processing...');
    try {
      const text = await file.text();
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

      if (lines.length < 2) {
        setUploadStatus('File must have a header row and at least one student.');
        return;
      }

      // Parse header
      const header = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      const rollIdx = header.findIndex(h => h.includes('roll'));
      const nameIdx = header.findIndex(h => h.includes('name'));
      const emailIdx = header.findIndex(h => h.includes('email'));

      if (rollIdx === -1 || nameIdx === -1) {
        setUploadStatus('CSV must have columns containing "roll" and "name" in the header.');
        return;
      }

      const students = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
        if (cols[rollIdx] && cols[nameIdx]) {
          students.push({
            roll_number: cols[rollIdx],
            student_name: cols[nameIdx],
            email: emailIdx !== -1 ? cols[emailIdx] || null : null,
          });
        }
      }

      if (students.length === 0) {
        setUploadStatus('No valid student rows found.');
        return;
      }

      const res = await fetch('/api/allowed-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, students }),
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`Successfully uploaded ${data.added} students.${data.errors ? ` (${data.errors.length} errors)` : ''}`);
        fetchAllowedStudents();
      } else {
        setUploadStatus(data.error || 'Upload failed.');
      }
    } catch (err) {
      setUploadStatus('Error reading file: ' + err.message);
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadTemplate = () => {
    const csv = 'roll_number,student_name,email\n"ROLL001","Student Name","student@example.com"\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_roster_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8">
          {/* CUSTOMIZE: Change dashboard title below */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Financial Derivatives Assessment Portal</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter admin password"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              {/* CUSTOMIZE: Change dashboard title and subtitle below */}
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Financial Derivatives</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Exam Toggle */}
              <button
                onClick={toggleExam}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  examEnabled
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {examEnabled ? 'Disable Exam' : 'Enable Exam'}
              </button>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                examEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
              }`}>
                {examEnabled ? 'LIVE' : 'INACTIVE'}
              </div>

              {/* Review Toggle */}
              <button
                onClick={toggleReview}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  showResultsToStudents
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Toggle student access to answer review"
              >
                Review: {showResultsToStudents ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Timer Setting */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <label className="text-sm text-gray-600">Timer per question:</label>
            <input
              type="number"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              min="30"
              max="600"
              className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-900"
            />
            <span className="text-sm text-gray-500">seconds</span>
            {parseInt(timeInput) !== timePerQuestion && (
              <button
                onClick={updateTimer}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Save
              </button>
            )}
            <span className="text-xs text-gray-400">(Current: {timePerQuestion}s = {Math.floor(timePerQuestion / 60)}m {timePerQuestion % 60}s per question)</span>

            <span className="text-gray-300 mx-2">|</span>

            <label className="text-sm text-gray-600">Questions per exam:</label>
            <input
              type="number"
              value={questionsInput}
              onChange={(e) => setQuestionsInput(e.target.value)}
              min="5"
              max="100"
              className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-900"
            />
            {parseInt(questionsInput) !== questionsPerExam && (
              <button
                onClick={updateQuestionsCount}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Save
              </button>
            )}
            <span className="text-xs text-gray-400">(Current: {questionsPerExam})</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-gray-200 rounded-lg p-1 w-fit">
          {['results', 'questions', 'students', 'roster'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); if (t === 'roster') fetchAllowedStudents(); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                tab === t ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t === 'roster' ? 'Allowed Students' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls (for results/questions/students tabs) */}
        {tab !== 'roster' && (
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Filter by Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
              />
            </div>
            <button
              onClick={fetchResults}
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Refresh
            </button>
            <button
              onClick={exportToExcel}
              className="mt-5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Export CSV
            </button>
            <div className="mt-5 text-sm text-gray-400">Auto-refreshes every 30s</div>
          </div>
        )}

        {loading && <div className="text-gray-500 mb-4">Loading...</div>}

        {/* Results Tab */}
        {results && tab === 'results' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <StatCard label="Submissions" value={results.analytics.totalSubmissions} />
              <StatCard label="Average Score" value={`${results.analytics.averageScore}/20`} />
              <StatCard label="Average %" value={`${results.analytics.averagePercentage}%`} />
              <StatCard label="Highest" value={results.analytics.highestScore} color="green" />
              <StatCard label="Lowest" value={results.analytics.lowestScore} color="red" />
              <StatCard label="Pass Rate" value={`${results.analytics.passRate}%`} color="blue" />
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Roll No</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">Score</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">%</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">Tab Switches</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">FS Exits</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">Time</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">Details</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700">Re-attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {results.submissions.map((sub, i) => (
                    <tr key={sub.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{sub.student_name}</td>
                      <td className="px-4 py-3 text-gray-600">{sub.roll_number}</td>
                      <td className="px-4 py-3 text-center font-bold">
                        <span className={sub.percentage >= 50 ? 'text-green-600' : 'text-red-600'}>
                          {sub.score}/{sub.total_questions}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          sub.percentage >= 70 ? 'bg-green-100 text-green-700' :
                          sub.percentage >= 50 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {sub.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-mono ${sub.tab_switches > 3 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                          {sub.tab_switches}
                        </span>
                        {sub.tab_switches > 5 && <span className="ml-1 text-red-500" title="Suspicious activity">&#9888;</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{sub.fullscreen_exits}</td>
                      <td className="px-4 py-3 text-center text-gray-500 text-xs">
                        {new Date(sub.created_at).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedStudent(sub)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => allowReattempt(sub)}
                          className="text-amber-600 hover:text-amber-800 text-xs font-semibold"
                        >
                          Allow
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.submissions.length === 0 && (
                <div className="py-12 text-center text-gray-400">No submissions yet for this date.</div>
              )}
            </div>
          </>
        )}

        {/* Question Analysis Tab */}
        {results && tab === 'questions' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-700">Question-wise Analysis (sorted by difficulty)</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Topic</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Question</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Correct</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Incorrect</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {results.questionAnalysis.map((q, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 text-xs font-medium">{q.topic}</td>
                    <td className="px-4 py-3 text-gray-900 text-xs max-w-md truncate" title={q.question}>
                      {q.question}
                    </td>
                    <td className="px-4 py-3 text-center text-green-600 font-mono">{q.correct}</td>
                    <td className="px-4 py-3 text-center text-red-600 font-mono">{q.incorrect}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              parseFloat(q.correctRate) >= 70 ? 'bg-green-500' :
                              parseFloat(q.correctRate) >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${q.correctRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono text-gray-600">{q.correctRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {results.questionAnalysis.length === 0 && (
              <div className="py-12 text-center text-gray-400">No question data available yet.</div>
            )}
          </div>
        )}

        {/* Per-student detail tab */}
        {tab === 'students' && (
          <div>
            {!selectedStudent ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                Select a student from the Results tab to view their detailed answers.
              </div>
            ) : (
              <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />
            )}
          </div>
        )}

        {/* Allowed Students (Roster) Tab */}
        {tab === 'roster' && (
          <div>
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Allowed Students Roster</h3>
              <p className="text-sm text-gray-500 mb-4">
                {allowedStudents.length === 0
                  ? 'No roster uploaded — all students can access the exam. Upload a roster to restrict access.'
                  : `${allowedStudents.length} students registered. Only these students can take the exam.`
                }
              </p>

              {/* Bulk Upload */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <label className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer">
                  Upload CSV
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={downloadTemplate}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  Download Template
                </button>
                {allowedStudents.length > 0 && (
                  <button
                    onClick={clearAllStudents}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {uploadStatus && (
                <div className={`text-sm mb-4 p-2 rounded ${uploadStatus.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {uploadStatus}
                </div>
              )}

              {/* Add Single Student */}
              <div className="flex items-end gap-3 mb-4 flex-wrap">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={newStudent.roll_number}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, roll_number: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 w-32"
                    placeholder="ROLL001"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={newStudent.student_name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, student_name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 w-48"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 w-48"
                    placeholder="student@email.com"
                  />
                </div>
                <button
                  onClick={addStudent}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Students Table */}
            {allowedStudents.length > 0 && (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Roll Number</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Email</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allowedStudents.map((s, i) => (
                      <tr key={s.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                        <td className="px-4 py-3 font-mono text-gray-900">{s.roll_number}</td>
                        <td className="px-4 py-3 text-gray-900">{s.student_name}</td>
                        <td className="px-4 py-3 text-gray-500">{s.email || '—'}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => removeStudent(s.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Student Detail Modal (from Results tab) */}
      {selectedStudent && tab === 'results' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color = 'gray' }) {
  const colors = {
    gray: 'text-gray-900',
    green: 'text-green-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
  };
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}

function StudentDetail({ student, onBack }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{student.student_name}</h3>
          <p className="text-sm text-gray-500">Roll: {student.roll_number} | Score: {student.score}/{student.total_questions} ({student.percentage}%)</p>
          <p className="text-xs text-gray-400">
            Tab switches: {student.tab_switches} | Fullscreen exits: {student.fullscreen_exits} |
            Submitted: {new Date(student.created_at).toLocaleString()}
          </p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <div className="space-y-4">
        {student.answers && student.answers.map((ans, i) => (
          <div key={i} className={`rounded-lg p-4 border-l-4 ${
            ans.isCorrect ? 'border-green-500 bg-green-50' :
            ans.selectedAnswer === -1 ? 'border-gray-300 bg-gray-50' :
            'border-red-500 bg-red-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Q{i + 1}. {ans.questionText}
                </p>
                <div className="space-y-1 text-sm">
                  {ans.options.map((opt, j) => (
                    <div key={j} className={`flex items-center gap-2 ${
                      j === ans.correctAnswer ? 'text-green-700 font-semibold' :
                      j === ans.selectedAnswer && !ans.isCorrect ? 'text-red-600 line-through' :
                      'text-gray-600'
                    }`}>
                      <span className="w-5">{String.fromCharCode(65 + j)}.</span>
                      <span>{opt}</span>
                      {j === ans.correctAnswer && <span className="text-green-500 text-xs ml-1">&#10003;</span>}
                      {j === ans.selectedAnswer && !ans.isCorrect && <span className="text-red-500 text-xs ml-1">&#10007;</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <div className={`text-xs font-bold ${
                  ans.isCorrect ? 'text-green-600' : ans.selectedAnswer === -1 ? 'text-gray-400' : 'text-red-600'
                }`}>
                  {ans.isCorrect ? 'CORRECT' : ans.selectedAnswer === -1 ? 'SKIPPED' : 'WRONG'}
                </div>
                <div className="text-xs text-gray-400 mt-1">{ans.timeSpent}s spent</div>
              </div>
            </div>
            {ans.explanation && (
              <div className="mt-2 text-xs text-gray-500 italic">
                {ans.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
