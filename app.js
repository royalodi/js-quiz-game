// app.js — Quiz Game Logic

const TIMER_SECONDS = 25;

let state = {
  category: null,
  questions: [],
  current: 0,
  score: 0,
  timer: null,
  timeLeft: TIMER_SECONDS,
  answered: false,
  highScores: JSON.parse(localStorage.getItem('quizHighScores') || '{}'),
};

// ── DOM References ──────────────────────────────────────────
const screens = {
  start: document.getElementById('screen-start'),
  quiz: document.getElementById('screen-quiz'),
  result: document.getElementById('screen-result'),
};
const catBtns = document.querySelectorAll('.cat-btn');
const startBtn = document.getElementById('btn-start');
const nextBtn = document.getElementById('btn-next');
const restartBtn = document.getElementById('btn-restart');
const homeBtn = document.getElementById('btn-home');

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-grid');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const categoryLabel = document.getElementById('category-label');
const timerEl = document.getElementById('timer');
const timerRing = document.getElementById('timer-ring');

const finalScore = document.getElementById('final-score');
const finalTotal = document.getElementById('final-total');
const finalPercent = document.getElementById('final-percent');
const finalMsg = document.getElementById('final-msg');
const highScoreEl = document.getElementById('high-score');
const answersReview = document.getElementById('answers-review');

// ── High Scores Display ─────────────────────────────────────
function updateHighScoreDisplays() {
  document.querySelectorAll('.hs-display').forEach(el => {
    const cat = el.dataset.cat;
    el.textContent = state.highScores[cat] !== undefined
      ? `Best: ${state.highScores[cat]}/10`
      : 'Not played';
  });
}
updateHighScoreDisplays();

// ── Category Selection ──────────────────────────────────────
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.cat;
    startBtn.disabled = false;
    startBtn.classList.add('pulse');
  });
});

// ── Start Quiz ──────────────────────────────────────────────
startBtn.addEventListener('click', () => {
  if (!state.category) return;
  const pool = [...QUESTIONS[state.category]];
  // Shuffle and take 10
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  state.questions = pool.slice(0, 10);
  state.current = 0;
  state.score = 0;
  state.answered = false;
  showScreen('quiz');
  loadQuestion();
});

// ── Load Question ───────────────────────────────────────────
function loadQuestion() {
  clearInterval(state.timer);
  state.answered = false;
  state.timeLeft = TIMER_SECONDS;
  nextBtn.classList.add('hidden');

  const q = state.questions[state.current];
  const total = state.questions.length;

  // Progress
  const pct = ((state.current) / total) * 100;
  progressBar.style.width = pct + '%';
  progressText.textContent = `${state.current + 1} / ${total}`;
  categoryLabel.textContent = state.category.toUpperCase();

  // Question
  questionEl.textContent = q.q;
  questionEl.style.animation = 'none';
  questionEl.offsetHeight; // reflow
  questionEl.style.animation = 'fadeSlide 0.3s ease';

  // Options
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${['A','B','C','D'][i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsEl.appendChild(btn);
    setTimeout(() => btn.classList.add('visible'), i * 60);
  });

  startTimer();
}

// ── Timer ───────────────────────────────────────────────────
function startTimer() {
  updateTimerDisplay();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      if (!state.answered) timeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = state.timeLeft;
  const pct = (state.timeLeft / TIMER_SECONDS) * 100;
  timerRing.style.background = `conic-gradient(
    ${state.timeLeft > 10 ? '#10b981' : '#ef4444'} ${pct}%,
    #252840 ${pct}%
  )`;
  timerEl.style.color = state.timeLeft <= 5 ? '#ef4444' : '#e4e6f1';
}

function timeUp() {
  state.answered = true;
  // Highlight correct answer
  const correct = state.questions[state.current].ans;
  document.querySelectorAll('.option-btn')[correct].classList.add('correct');
  nextBtn.classList.remove('hidden');
}

// ── Select Answer ───────────────────────────────────────────
function selectAnswer(idx) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  const q = state.questions[state.current];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && idx !== q.ans) btn.classList.add('wrong');
  });

  if (idx === q.ans) {
    state.score++;
    buttons[idx].classList.add('correct');
  }

  nextBtn.classList.remove('hidden');
}

// ── Next Question ───────────────────────────────────────────
nextBtn.addEventListener('click', () => {
  state.current++;
  if (state.current < state.questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// ── Results ─────────────────────────────────────────────────
function showResults() {
  clearInterval(state.timer);
  showScreen('result');

  const pct = Math.round((state.score / state.questions.length) * 100);
  finalScore.textContent = state.score;
  finalTotal.textContent = state.questions.length;
  finalPercent.textContent = `${pct}%`;

  // Save high score
  const cat = state.category;
  if (!state.highScores[cat] || state.score > state.highScores[cat]) {
    state.highScores[cat] = state.score;
    localStorage.setItem('quizHighScores', JSON.stringify(state.highScores));
    highScoreEl.textContent = `🏆 New High Score for ${cat.toUpperCase()}!`;
    highScoreEl.classList.add('new-hs');
  } else {
    highScoreEl.textContent = `Best for ${cat.toUpperCase()}: ${state.highScores[cat]}/10`;
  }

  // Message
  if (pct === 100) finalMsg.textContent = '🏆 Perfect Score! You\'re a genius!';
  else if (pct >= 80) finalMsg.textContent = '🎉 Excellent! Great knowledge!';
  else if (pct >= 60) finalMsg.textContent = '👍 Good job! Keep learning!';
  else if (pct >= 40) finalMsg.textContent = '📚 Not bad! Study more!';
  else finalMsg.textContent = '💪 Keep practicing! You\'ll get there!';

  // Review
  answersReview.innerHTML = '';
  state.questions.forEach((q, i) => {
    const div = document.createElement('div');
    const isCorrect = state.questions[i]._selected === q.ans;
    div.className = 'review-item';
    div.innerHTML = `
      <span class="review-num">${i + 1}</span>
      <span class="review-q">${q.q}</span>
      <span class="review-ans correct-ans">✓ ${q.options[q.ans]}</span>
    `;
    answersReview.appendChild(div);
  });

  // Animate score counter
  let n = 0;
  const interval = setInterval(() => {
    if (n >= state.score) { clearInterval(interval); return; }
    n++;
    finalScore.textContent = n;
  }, 100);
}

restartBtn.addEventListener('click', () => {
  showScreen('quiz');
  state.current = 0;
  state.score = 0;
  loadQuestion();
});

homeBtn.addEventListener('click', () => {
  clearInterval(state.timer);
  catBtns.forEach(b => b.classList.remove('active'));
  startBtn.disabled = true;
  state.category = null;
  updateHighScoreDisplays();
  showScreen('start');
});

// ── Utility ─────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}
