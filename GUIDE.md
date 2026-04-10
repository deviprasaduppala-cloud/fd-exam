# Online MCQ Exam App — Complete Setup Guide

A ready-to-deploy online MCQ exam platform for educators. Students get randomized questions with per-question timers, anti-cheating measures (fullscreen enforcement, tab-switch monitoring), and instant results. You get a real-time admin dashboard with analytics, CSV export, and per-student answer review.

---

## What You Get

- **Student Portal**: Login with name + roll number, 20 random MCQs from your question bank, independent timer per question, fullscreen lockdown
- **Anti-Cheating**: Fullscreen enforcement, tab-switch counting, copy/paste disabled, right-click disabled — all logged for your review
- **Admin Dashboard** (password-protected): Enable/disable exam with one click, live submission table, question-wise difficulty analysis, per-student answer review, CSV export, allow re-attempts
- **Question Randomization**: Each student gets a different set of 20 questions from your pool, with shuffled option order
- **One attempt per day**: Students cannot retake unless you explicitly allow it from the dashboard

---

## Prerequisites

You need two things:
1. **Node.js** (free) — to run the app locally and build it
2. **Supabase** (free tier) — cloud database to store submissions

---

## Step-by-Step Setup

### STEP 1: Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button)
3. Install it (keep clicking "Next" — all defaults are fine)
4. Verify installation: open a terminal/command prompt and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x`. If you see an error, restart your computer and try again.

### STEP 2: Create a Supabase Account (Free)

1. Go to https://supabase.com and click "Start your project"
2. Sign up with your GitHub account (or email)
3. Click "New project"
4. Fill in:
   - **Name**: anything (e.g., "my-exam-app")
   - **Database Password**: generate a strong one (you won't need this directly)
   - **Region**: pick the one closest to your students
5. Click "Create new project" — wait 1-2 minutes for it to set up

### STEP 3: Set Up the Database

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "New query"
3. Open the file `supabase-schema.sql` from this folder
4. Copy ALL the content and paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned." — that's correct!

> **IMPORTANT**: Before running the SQL, change the exam title on line 29 from `'My Course Assessment'` to your actual course name. For example: `'Marketing Management Unit 1 Quiz'`

### STEP 4: Get Your Supabase Keys

1. In Supabase dashboard, click **Settings** (gear icon) in the left sidebar
2. Click **API** under "Configuration"
3. You need two values:
   - **Project URL**: looks like `https://xxxxx.supabase.co`
   - **anon public key**: a long string starting with `eyJ...`
4. Keep this page open — you'll need these in the next step

### STEP 5: Configure the App

1. In this project folder, find the file `.env.local.example`
2. **Make a copy** of it and rename the copy to `.env.local`
3. Open `.env.local` in any text editor (Notepad works)
4. Fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_PASSWORD=choose-a-strong-password-here
EXAM_ENABLED=true
QUESTIONS_PER_EXAM=20
TIME_PER_QUESTION=120
```

- **ADMIN_PASSWORD**: Choose something strong. You'll use this to access the admin dashboard.
- **QUESTIONS_PER_EXAM**: How many questions each student gets (default: 20)
- **TIME_PER_QUESTION**: Seconds per question (default: 120 = 2 minutes)

### STEP 6: Add Your Questions

This is the most important step. Open `lib/questions.js` and replace the sample questions with your own.

**Each question follows this exact format:**
```javascript
{
  id: 1,                          // Unique number (1, 2, 3, ...)
  session: 1,                     // Group/unit number (for balanced selection)
  topic: "Topic Name",            // Short topic label
  question: "Your question text here?",
  options: [
    "Option A text",              // Index 0
    "Option B text",              // Index 1
    "Option C text",              // Index 2
    "Option D text"               // Index 3
  ],
  correct: 0,                     // Index of the correct option (0=A, 1=B, 2=C, 3=D)
  explanation: "Why this answer is correct."
}
```

**Key rules:**
- Every question MUST have exactly 4 options
- `correct` is the index (0 for first option, 1 for second, 2 for third, 3 for fourth)
- `session` groups questions — the app picks equally from each group for balanced coverage
- `id` must be unique for every question
- Aim for at least 50+ questions so students get varied sets. The more questions, the less overlap between students.

**Tips:**
- If you have 5 chapters, use sessions 1-5
- With 20 questions per exam and 5 sessions, each student gets ~4 questions per session
- 100+ questions across sessions gives excellent variety

### STEP 7: Customize the Branding

Open these files and change the course name / module code to yours:

1. **`app/layout.js`** — Change the `title` and `description` in the metadata
2. **`app/page.js`** — Change the module code, course name, and unit text displayed on the login page
3. **`app/results/page.js`** — Change the course code shown on the results page
4. **`app/admin/page.js`** — Change the dashboard title and subtitle

Search for `YOUR_MODULE_CODE` and `Your Course Name` — these are the placeholders to replace.

### STEP 8: Run Locally (Test First!)

1. Open a terminal/command prompt in this project folder
2. Run:
   ```
   npm install
   ```
   (Wait for it to finish — may take 1-2 minutes)
3. Then run:
   ```
   npm run dev
   ```
4. Open your browser and go to: **http://localhost:3000**
5. Test the student flow: enter a name and roll number, take the exam
6. Test the admin dashboard: go to **http://localhost:3000/admin** and log in with your ADMIN_PASSWORD

### STEP 9: Deploy to the Internet (Free via Vercel)

To make the app accessible to students over the internet:

1. Create a free account at https://vercel.com
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. In your project folder, run:
   ```
   vercel
   ```
4. Follow the prompts (say Yes to everything, pick defaults)
5. **IMPORTANT** — Set your environment variables on Vercel:
   - Go to your project on https://vercel.com/dashboard
   - Click **Settings** → **Environment Variables**
   - Add ALL the variables from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `ADMIN_PASSWORD`
     - `EXAM_ENABLED`
     - `QUESTIONS_PER_EXAM`
     - `TIME_PER_QUESTION`
6. Redeploy after adding variables:
   ```
   vercel --prod
   ```
7. You'll get a URL like `https://your-app.vercel.app` — share this with students!

**Alternative: Deploy via GitHub (easier for future updates)**
1. Push this project to a GitHub repository
2. On Vercel, click "New Project" → "Import Git Repository" → select your repo
3. Add the environment variables in the Vercel setup screen
4. Click Deploy — done! Future pushes to GitHub auto-deploy.

---

## Exam Day Workflow

1. **Before the exam**: Go to `your-app-url/admin`, log in, click **"Enable Exam"**
2. **Share the link**: Give students `your-app-url` (the home page)
3. **Monitor live**: Keep the admin dashboard open — it auto-refreshes every 30 seconds
4. **After the exam**: Click **"Disable Exam"** to prevent late submissions
5. **Export results**: Click **"Export CSV"** to download all scores
6. **Review suspicious activity**: Check the "Tab Switches" column — high numbers (>5) may indicate tab switching to look up answers

---

## Features Quick Reference

| Feature | How It Works |
|---|---|
| **Random questions** | Each student gets a different set of N questions from your pool |
| **Shuffled options** | Even if two students get the same question, the option order (A/B/C/D) is different |
| **Per-question timer** | Each question has its own countdown. Timer pauses when student moves to another question. |
| **Fullscreen mode** | Exam enters fullscreen automatically. Exits are counted and logged. |
| **Tab monitoring** | If students switch to another tab or window, it's counted and shown in admin dashboard |
| **Copy/paste blocked** | Right-click, Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+U are all disabled during the exam |
| **One attempt/day** | Same roll number cannot take the exam twice on the same day |
| **Admin toggle** | Enable/disable the exam with one button — students see "not active" when disabled |
| **Re-attempt** | Admin can delete a student's submission to let them retake |
| **CSV export** | Download all results for a date as a CSV file |
| **Question analysis** | See which questions were hardest/easiest across all submissions |

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `npm install` fails | Make sure Node.js is installed. Run `node --version` to check. |
| "exam not active" error | Go to admin dashboard and click "Enable Exam" |
| Student says "already taken" | They already submitted today. Use admin dashboard → "Allow" to let them retake. |
| Admin password doesn't work | Check `.env.local` file — make sure there are no extra spaces around the password |
| Supabase errors | Make sure you ran the SQL schema. Check that your Supabase URL and key in `.env.local` are correct. |
| Blank page after deploy | Make sure all environment variables are set on Vercel and you redeployed after adding them. |
| Timer issues | Make sure `TIME_PER_QUESTION` is set in `.env.local` (default: 120 seconds) |

---

## File Structure

```
exam-app-template/
├── .env.local.example          ← Copy to .env.local and fill in your values
├── supabase-schema.sql         ← Run this in Supabase SQL Editor (once)
├── package.json                ← Dependencies (do not edit)
├── lib/
│   ├── supabase.js             ← Database connection (do not edit)
│   └── questions.js            ← YOUR QUESTIONS GO HERE
├── app/
│   ├── layout.js               ← Page title/metadata (customize)
│   ├── page.js                 ← Student login page (customize branding)
│   ├── globals.css             ← Styles (do not edit)
│   ├── exam/page.js            ← Exam interface (do not edit)
│   ├── results/page.js         ← Results page (customize branding)
│   ├── admin/page.js           ← Admin dashboard (customize branding)
│   └── api/                    ← Backend logic (do not edit)
│       ├── start-exam/route.js
│       ├── submit-exam/route.js
│       ├── exam-status/route.js
│       ├── results/route.js
│       ├── export/route.js
│       └── allow-reattempt/route.js
└── config files (do not edit):
    ├── next.config.mjs
    ├── tailwind.config.js
    ├── postcss.config.mjs
    └── jsconfig.json
```

**Files you need to edit:**
1. `.env.local` — Your credentials and settings
2. `lib/questions.js` — Your question bank
3. `app/layout.js` — Course title
4. `app/page.js` — Login page branding
5. `app/results/page.js` — Results page branding
6. `app/admin/page.js` — Dashboard branding
7. `supabase-schema.sql` — Exam title (before running it)

Everything else works as-is. Do not modify API routes or the exam page unless you know what you're doing.

---

## Need Help?

If you get stuck, the most common issues are:
1. Node.js not installed → download from https://nodejs.org
2. Supabase SQL not executed → go to SQL Editor and run the schema
3. `.env.local` not created → copy from `.env.local.example`
4. Environment variables missing on Vercel → add them in Vercel project settings

This app was built with Next.js 14, React, Supabase (PostgreSQL), and Tailwind CSS. It's completely free to run on Vercel's free tier and Supabase's free tier for typical class sizes (up to ~500 students).
