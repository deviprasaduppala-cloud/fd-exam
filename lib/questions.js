// ============================================================
// FINANCIAL DERIVATIVES — QUESTION BANK
// ============================================================
// Paste your questions below in the exact format shown.
// Generate questions in Claude Chat using your textbook, then paste here.
//
// Each question needs:
//   id       — unique number (1, 2, 3, ...)
//   session  — chapter/unit number (for balanced selection)
//   topic    — short topic label (shown in admin analytics)
//   question — the question text
//   options  — array of exactly 4 choices
//   correct  — index of the correct option (0=A, 1=B, 2=C, 3=D)
//   explanation — why the answer is correct (shown to students in review)
// ============================================================

const questions = [
  // ============================================================
  // PASTE YOUR GENERATED QUESTIONS HERE
  // Target: 350 questions across all sessions/chapters
  // ============================================================

  // Placeholder questions — REPLACE these with your actual FD questions
  {
    id: 1,
    session: 1,
    topic: "Introduction to Derivatives",
    question: "Which of the following is NOT a type of financial derivative?",
    options: [
      "Forward contract",
      "Fixed deposit",
      "Options contract",
      "Futures contract"
    ],
    correct: 1,
    explanation: "A fixed deposit is a banking product, not a derivative. Derivatives include forwards, futures, options, and swaps — instruments whose value is derived from an underlying asset."
  },
  {
    id: 2,
    session: 1,
    topic: "Introduction to Derivatives",
    question: "What does the term 'underlying asset' refer to in derivative markets?",
    options: [
      "The derivative contract itself",
      "The asset from which a derivative derives its value",
      "The margin deposited with the exchange",
      "The premium paid for an options contract"
    ],
    correct: 1,
    explanation: "The underlying asset is the financial instrument (stock, bond, commodity, index, currency, etc.) on which a derivative's price is based."
  },
  {
    id: 3,
    session: 1,
    topic: "Introduction to Derivatives",
    question: "Which of the following best describes a zero-sum game in derivatives?",
    options: [
      "Both parties always profit equally",
      "One party's gain is exactly equal to the other party's loss",
      "The total market value of derivatives is always zero",
      "Derivatives can only be traded at zero cost"
    ],
    correct: 1,
    explanation: "Derivatives are zero-sum games because the total gains and losses of all parties net to zero — what one side gains, the other side loses."
  },
  {
    id: 4,
    session: 2,
    topic: "Forward Contracts",
    question: "What is the key difference between a forward contract and a futures contract?",
    options: [
      "Forwards are exchange-traded while futures are OTC",
      "Futures are standardized and exchange-traded while forwards are customized OTC contracts",
      "Forwards require daily settlement while futures do not",
      "There is no difference between them"
    ],
    correct: 1,
    explanation: "Futures are standardized contracts traded on exchanges with daily mark-to-market settlement, while forwards are customized OTC contracts settled at maturity with counterparty risk."
  },
  {
    id: 5,
    session: 2,
    topic: "Options Basics",
    question: "A call option gives the holder the right to:",
    options: [
      "Sell the underlying asset at the strike price",
      "Buy the underlying asset at the strike price",
      "Receive dividends from the underlying asset",
      "Exchange one currency for another"
    ],
    correct: 1,
    explanation: "A call option gives the holder (buyer) the right, but not the obligation, to buy the underlying asset at the predetermined strike price on or before expiration."
  },
];

// ============================================================
// DO NOT MODIFY ANYTHING BELOW THIS LINE
// ============================================================

// Utility: Get n random questions from the pool, balanced across sessions
export function getRandomQuestions(n = 20, excludeIds = new Set()) {
  // Filter out previously seen questions (for re-attempts)
  let pool = questions;
  if (excludeIds.size > 0) {
    pool = questions.filter(q => !excludeIds.has(q.id));
    // If not enough fresh questions, fall back to full pool
    if (pool.length < n) {
      pool = questions;
    }
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Try to balance across sessions
  const sessions = [...new Set(pool.map(q => q.session))].sort();
  const perSession = Math.floor(n / sessions.length);

  const selected = [];
  const bySession = {};

  for (const q of shuffled) {
    if (!bySession[q.session]) bySession[q.session] = [];
    bySession[q.session].push(q);
  }

  // Pick perSession from each session
  for (const s of sessions) {
    const sessionPool = bySession[s] || [];
    selected.push(...sessionPool.slice(0, perSession));
  }

  // Fill remainder from shuffled pool (questions not yet selected)
  const selectedIds = new Set(selected.map(q => q.id));
  for (const q of shuffled) {
    if (selected.length >= n) break;
    if (!selectedIds.has(q.id)) {
      selected.push(q);
      selectedIds.add(q.id);
    }
  }

  // Final shuffle and return with shuffled options
  return selected.slice(0, n).sort(() => Math.random() - 0.5).map(q => {
    // Shuffle options while tracking the correct answer
    const optionIndices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    const shuffledOptions = optionIndices.map(i => q.options[i]);
    const newCorrect = optionIndices.indexOf(q.correct);

    return {
      id: q.id,
      session: q.session,
      topic: q.topic,
      question: q.question,
      options: shuffledOptions,
      correct: newCorrect,
      explanation: q.explanation
    };
  });
}

export function getTotalQuestionCount() {
  return questions.length;
}
