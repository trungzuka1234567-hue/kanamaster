/**
 * Main Application Logic for KanaMaster SPA
 * Supports Hiragana, Katakana, Kanji, and Romaji learning modes.
 * Features: 3D Flip Card Study Mode, Enhanced Multi-Type Quiz (Drag & Drop, MCQ, Typing),
 * 3 Difficulty Levels, Decoy System, Bidirectional Testing,
 * Mistakes Notebook (Sổ Tay Lỗi Sai), Sound Effects, Timer Countdown, Combo System,
 * LocalStorage Persistence & Sakura/Confetti Canvases.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. STATE VARIABLES
  // ------------------------------------------------------------------------
  const state = {
    alphabet: 'hiragana', // 'hiragana' | 'katakana' | 'kanji' | 'romaji'
    groupIndex: 0,
    cardIndex: 0,
    view: 'study-view',
    
    // Quiz State
    quizMode: 'challenge', // 'practice' | 'challenge'
    isMistakesQuiz: false,
    quizLevel: 1, // 1 = Easy, 2 = Medium, 3 = Hard
    quizItems: [],
    matchedCount: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    timeLeft: 60,
    timerId: null,

    // Enhanced Quiz
    questions: [],          // Array of question objects
    currentQuestionIndex: 0,
    totalQuestions: 10,
    hintsRemaining: 3,
    currentDragBatchDone: false, // Track if current drag batch is complete

    // Persistence
    streakDays: 1,
    totalScore: 0,
    mistakesList: [] // [{ alphabet, char, romaji, example, meaning, mnemonicIcon, mnemonicText, hint, errorCount }]
  };

  // ------------------------------------------------------------------------
  // 2. DOM ELEMENTS
  // ------------------------------------------------------------------------
  const elements = {
    // Theme & Audio Controls
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    streakCount: document.getElementById('streak-count'),
    totalScoreDisplay: document.getElementById('total-score-display'),
    
    // Alphabet & Mode Nav
    alphabetBtns: document.querySelectorAll('.alphabet-btn'),
    modeTabs: document.querySelectorAll('.mode-tab'),
    viewScreens: document.querySelectorAll('.view-screen'),
    logoHomeBtn: document.getElementById('logo-home-btn'),

    // Study Mode
    groupSelect: document.getElementById('group-select'),
    flipCard: document.getElementById('flip-card-element'),
    cardBadgeFront: document.getElementById('card-badge-front'),
    cardCharDisplay: document.getElementById('card-char-display'),
    cardRomajiDisplay: document.getElementById('card-romaji-display'),
    cardSpeakBtn: document.getElementById('card-speak-btn'),
    cardMnemonicIcon: document.getElementById('card-mnemonic-icon'),
    cardMnemonicStory: document.getElementById('card-mnemonic-story'),
    cardExampleJp: document.getElementById('card-example-jp'),
    cardExampleMeaning: document.getElementById('card-example-meaning'),
    prevCardBtn: document.getElementById('prev-card-btn'),
    nextCardBtn: document.getElementById('next-card-btn'),
    cardCounter: document.getElementById('card-counter'),
    startQuizNowBtn: document.getElementById('start-quiz-now-btn'),

    // Quiz Mode
    quizScoreDisplay: document.getElementById('quiz-score-display'),
    comboBadge: document.getElementById('combo-badge-element'),
    comboCountDisplay: document.getElementById('combo-count-display'),
    timerBox: document.getElementById('timer-box-element'),
    timerCountdown: document.getElementById('timer-countdown'),
    quizModeToggleBtn: document.getElementById('quiz-mode-toggle-btn'),
    quizHintBtn: document.getElementById('quiz-hint-btn'),
    hintsRemainingCount: document.getElementById('hints-remaining-count'),
    draggableContainer: document.getElementById('draggable-cards-container'),
    dropTargetsContainer: document.getElementById('drop-targets-container'),

    // Level Selector
    levelBtns: document.querySelectorAll('.level-btn'),

    // Progress Bar
    questionCounter: document.getElementById('quiz-question-counter'),
    questionTypeBadge: document.getElementById('quiz-question-type-badge'),
    progressFill: document.getElementById('quiz-progress-fill'),

    // Quiz Boards
    dragBoard: document.getElementById('quiz-drag-board'),
    mcqBoard: document.getElementById('quiz-mcq-board'),
    typingBoard: document.getElementById('quiz-typing-board'),

    // MCQ Elements
    mcqDirectionBadge: document.getElementById('mcq-direction-badge'),
    mcqPrompt: document.getElementById('mcq-prompt'),
    mcqSpeakBtn: document.getElementById('mcq-speak-btn'),
    mcqOptionsGrid: document.getElementById('mcq-options-grid'),

    // Typing Elements
    typingDirectionBadge: document.getElementById('typing-direction-badge'),
    typingPrompt: document.getElementById('typing-prompt'),
    typingSpeakBtn: document.getElementById('typing-speak-btn'),
    typingInput: document.getElementById('typing-answer-input'),
    typingSubmitBtn: document.getElementById('typing-submit-btn'),
    typingFeedback: document.getElementById('typing-feedback'),

    // Explorer Mode
    explorerGrid: document.getElementById('explorer-grid-container'),

    // Mistakes View
    mistakeBadgeCount: document.getElementById('mistake-badge-count'),
    mistakesHeaderCount: document.getElementById('mistakes-header-count'),
    mistakesGridContainer: document.getElementById('mistakes-grid-container'),
    practiceMistakesBtn: document.getElementById('practice-mistakes-btn'),
    clearMistakesBtn: document.getElementById('clear-mistakes-btn'),

    // Result Modal
    resultModal: document.getElementById('result-modal'),
    modalEmoji: document.getElementById('modal-emoji'),
    modalTitle: document.getElementById('modal-title'),
    modalSubtitle: document.getElementById('modal-subtitle'),
    modalScore: document.getElementById('modal-score'),
    modalAccuracy: document.getElementById('modal-accuracy'),
    modalMaxCombo: document.getElementById('modal-max-combo'),
    modalRating: document.getElementById('modal-rating'),
    modalRestartBtn: document.getElementById('modal-restart-btn'),
    modalNextBtn: document.getElementById('modal-next-btn'),

    // Canvases
    sakuraCanvas: document.getElementById('sakura-canvas'),
    confettiCanvas: document.getElementById('confetti-canvas')
  };

  // ------------------------------------------------------------------------
  // 3. INITIALIZATION & LOCALSTORAGE
  // ------------------------------------------------------------------------
  function init() {
    loadUserData();
    setupThemeAndAudio();
    populateGroupDropdown();
    renderStudyCard();
    renderExplorerGrid();
    renderMistakesView();
    setupEventListeners();
    initSakuraBackground();
  }

  function loadUserData() {
    const savedScore = localStorage.getItem('kana_total_score');
    if (savedScore) state.totalScore = parseInt(savedScore, 10);

    const savedStreak = localStorage.getItem('kana_streak');
    const lastDate = localStorage.getItem('kana_last_date');
    const today = new Date().toDateString();

    if (lastDate) {
      if (lastDate !== today) {
        const last = new Date(lastDate);
        const now = new Date(today);
        const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          state.streakDays = (parseInt(savedStreak, 10) || 1) + 1;
        } else if (diffDays > 1) {
          state.streakDays = 1;
        } else {
          state.streakDays = parseInt(savedStreak, 10) || 1;
        }
      } else {
        state.streakDays = parseInt(savedStreak, 10) || 1;
      }
    } else {
      state.streakDays = 1;
    }

    localStorage.setItem('kana_last_date', today);
    localStorage.setItem('kana_streak', state.streakDays);

    // Load mistakes list
    const savedMistakes = localStorage.getItem('kana_mistakes');
    if (savedMistakes) {
      try {
        state.mistakesList = JSON.parse(savedMistakes);
      } catch (e) {
        state.mistakesList = [];
      }
    }

    // Load saved level
    const savedLevel = localStorage.getItem('kana_quiz_level');
    if (savedLevel) state.quizLevel = parseInt(savedLevel, 10) || 1;

    elements.streakCount.textContent = state.streakDays;
    elements.totalScoreDisplay.textContent = state.totalScore;
    updateMistakesBadgeCount();
    updateLevelUI();
  }

  function setupThemeAndAudio() {
    const savedTheme = localStorage.getItem('kana_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeToggleBtn.textContent = savedTheme === 'dark' ? '🌙' : '🌸';
  }

  function updateMistakesBadgeCount() {
    const count = state.mistakesList.length;
    if (elements.mistakeBadgeCount) elements.mistakeBadgeCount.textContent = count;
    if (elements.mistakesHeaderCount) elements.mistakesHeaderCount.textContent = count;
  }

  function saveMistakes() {
    localStorage.setItem('kana_mistakes', JSON.stringify(state.mistakesList));
    updateMistakesBadgeCount();
  }

  function recordMistake(char, romaji) {
    const currentGroup = getCurrentGroup();
    const foundItem = currentGroup ? currentGroup.items.find(i => i.char === char) : null;

    // Also search across all groups if not found in current
    let searchItem = foundItem;
    if (!searchItem) {
      const alphabetData = JAPANESE_DATA[state.alphabet];
      if (alphabetData && alphabetData.groups) {
        for (const g of alphabetData.groups) {
          const found = g.items.find(i => i.char === char);
          if (found) { searchItem = found; break; }
        }
      }
    }

    const existingIndex = state.mistakesList.findIndex(m => m.char === char);
    if (existingIndex >= 0) {
      state.mistakesList[existingIndex].errorCount++;
    } else {
      state.mistakesList.push({
        alphabet: state.alphabet,
        char: char,
        romaji: romaji,
        example: searchItem ? searchItem.example : '',
        meaning: searchItem ? searchItem.meaning : '',
        mnemonicIcon: searchItem ? searchItem.mnemonicIcon : '💡',
        mnemonicText: searchItem ? (searchItem.mnemonicText || searchItem.hint) : '',
        hint: searchItem ? searchItem.hint : '',
        errorCount: 1
      });
    }
    saveMistakes();
  }

  // ------------------------------------------------------------------------
  // 4. NAVIGATION & DROPDOWNS
  // ------------------------------------------------------------------------
  function populateGroupDropdown() {
    const alphabetData = JAPANESE_DATA[state.alphabet];
    if (!alphabetData || !alphabetData.groups) return;

    const groups = alphabetData.groups;
    elements.groupSelect.innerHTML = groups.map((g, idx) => `
      <option value="${idx}">${g.name} (${g.badge})</option>
    `).join('');
    elements.groupSelect.value = state.groupIndex;
  }

  function switchAlphabet(newAlphabet) {
    state.alphabet = newAlphabet;
    state.groupIndex = 0;
    state.cardIndex = 0;

    elements.alphabetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.alphabet === newAlphabet);
    });

    populateGroupDropdown();
    renderStudyCard();
    renderExplorerGrid();
    if (state.view === 'quiz-view') {
      startNewQuiz();
    }
  }

  function switchView(viewId) {
    state.view = viewId;
    elements.viewScreens.forEach(screen => {
      screen.classList.toggle('active', screen.id === viewId);
    });
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewId);
    });

    if (viewId === 'quiz-view') {
      state.isMistakesQuiz = false;
      startNewQuiz();
    } else if (viewId === 'mistakes-view') {
      stopQuizTimer();
      renderMistakesView();
    } else {
      stopQuizTimer();
    }
  }

  // ------------------------------------------------------------------------
  // 5. STEP 1: STUDY MODE LOGIC (3D FLIP CARD)
  // ------------------------------------------------------------------------
  function getCurrentGroup() {
    const alphabetData = JAPANESE_DATA[state.alphabet] || JAPANESE_DATA.hiragana;
    return alphabetData.groups[state.groupIndex] || alphabetData.groups[0];
  }

  function getCurrentCard() {
    const group = getCurrentGroup();
    return group.items[state.cardIndex] || group.items[0];
  }

  function renderStudyCard() {
    const group = getCurrentGroup();
    const item = getCurrentCard();

    // Reset flip state
    elements.flipCard.classList.remove('flipped');

    elements.cardBadgeFront.textContent = group.badge;
    elements.cardCharDisplay.textContent = item.char;

    // Dynamic Font Scaling for Long Words/Romaji to prevent card overflow
    const charLen = item.char ? item.char.length : 1;
    if (charLen <= 2) {
      elements.cardCharDisplay.style.fontSize = '5.5rem';
    } else if (charLen <= 4) {
      elements.cardCharDisplay.style.fontSize = '3.4rem';
    } else if (charLen <= 6) {
      elements.cardCharDisplay.style.fontSize = '2.4rem';
    } else {
      elements.cardCharDisplay.style.fontSize = '1.8rem';
    }

    elements.cardRomajiDisplay.textContent = item.romaji;
    elements.cardMnemonicIcon.textContent = item.mnemonicIcon || '💡';
    elements.cardMnemonicStory.textContent = item.mnemonicText || item.hint;
    elements.cardExampleJp.textContent = item.example;
    elements.cardExampleMeaning.textContent = item.meaning;

    elements.cardCounter.textContent = `${state.cardIndex + 1} / ${group.items.length}`;
  }

  function nextStudyCard() {
    const group = getCurrentGroup();
    state.cardIndex = (state.cardIndex + 1) % group.items.length;
    sound.playFx('flip');
    renderStudyCard();
  }

  function prevStudyCard() {
    const group = getCurrentGroup();
    state.cardIndex = (state.cardIndex - 1 + group.items.length) % group.items.length;
    sound.playFx('flip');
    renderStudyCard();
  }

  // ------------------------------------------------------------------------
  // 6. ENHANCED QUIZ SYSTEM
  // ------------------------------------------------------------------------

  // -- 6a. HELPER: Get all items from current alphabet --
  function getAllAlphabetItems() {
    const alphabetData = JAPANESE_DATA[state.alphabet];
    if (!alphabetData || !alphabetData.groups) return [];
    const allItems = [];
    alphabetData.groups.forEach(g => {
      g.items.forEach(item => {
        allItems.push({ ...item });
      });
    });
    return allItems;
  }

  // -- 6b. HELPER: Get decoy items (from same alphabet, excluding given items) --
  function getDecoyItems(excludeItems, count) {
    const allItems = getAllAlphabetItems();
    const excludeChars = new Set(excludeItems.map(i => i.char));
    const pool = allItems.filter(item => !excludeChars.has(item.char));
    return shuffleArray(pool).slice(0, count);
  }

  // -- 6c. LEVEL CONFIG --
  function getLevelConfig() {
    const configs = {
      1: { // Easy
        questionTypes: ['drag', 'mcq'],
        decoyCount: 1,
        hintsMax: 5,
        timeSeconds: 90,
        totalQuestions: 10,
        dragBatchSize: 5
      },
      2: { // Medium
        questionTypes: ['drag', 'mcq', 'typing'],
        decoyCount: 2,
        hintsMax: 3,
        timeSeconds: 60,
        totalQuestions: 10,
        dragBatchSize: 5
      },
      3: { // Hard
        questionTypes: ['drag', 'mcq', 'typing'],
        decoyCount: 3,
        hintsMax: 0,
        timeSeconds: 45,
        totalQuestions: 12,
        dragBatchSize: 5
      }
    };
    return configs[state.quizLevel] || configs[1];
  }

  // -- 6d. UPDATE LEVEL UI --
  function updateLevelUI() {
    elements.levelBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.level) === state.quizLevel);
    });
  }

  // -- 6e. GENERATE QUIZ QUESTIONS --
  function generateQuizQuestions() {
    const config = getLevelConfig();
    const allItems = getAllAlphabetItems();
    
    if (allItems.length === 0) return [];

    // Pick random items from the pool, shuffled
    const shuffled = shuffleArray([...allItems]);
    const selectedItems = shuffled.slice(0, Math.min(config.totalQuestions * 2, shuffled.length));
    
    const questions = [];
    let itemIndex = 0;

    // We need to generate questions. For drag type, we batch 5 items per question.
    // For MCQ/typing, each item is a single question.
    let remaining = config.totalQuestions;

    while (remaining > 0 && itemIndex < selectedItems.length) {
      const typePool = [...config.questionTypes];
      const questionType = typePool[Math.floor(Math.random() * typePool.length)];
      
      // Random direction: 'char-to-romaji' or 'romaji-to-char'
      const direction = Math.random() < 0.5 ? 'char-to-romaji' : 'romaji-to-char';

      if (questionType === 'drag') {
        // Batch: take up to dragBatchSize items
        const batchItems = [];
        for (let i = 0; i < config.dragBatchSize && itemIndex < selectedItems.length; i++) {
          batchItems.push(selectedItems[itemIndex++]);
        }

        if (batchItems.length > 0) {
          // Get decoys
          const decoys = getDecoyItems(batchItems, config.decoyCount);
          
          questions.push({
            type: 'drag',
            direction: direction,
            items: batchItems,
            decoys: decoys
          });
          remaining--;
        }
      } else if (questionType === 'mcq') {
        const item = selectedItems[itemIndex++];
        
        // Generate 3 wrong options
        const wrongItems = getDecoyItems([item], 3);
        const options = shuffleArray([
          { value: direction === 'char-to-romaji' ? item.romaji : item.char, correct: true, char: item.char, romaji: item.romaji },
          ...wrongItems.map(w => ({
            value: direction === 'char-to-romaji' ? w.romaji : w.char,
            correct: false,
            char: w.char,
            romaji: w.romaji
          }))
        ]);

        questions.push({
          type: 'mcq',
          direction: direction,
          item: item,
          options: options
        });
        remaining--;
      } else if (questionType === 'typing') {
        const item = selectedItems[itemIndex++];
        
        questions.push({
          type: 'typing',
          direction: direction,
          item: item
        });
        remaining--;
      }
    }

    return questions;
  }

  // -- 6f. START NEW QUIZ --
  function startNewQuiz() {
    state.isMistakesQuiz = false;
    
    const config = getLevelConfig();
    state.totalQuestions = config.totalQuestions;
    state.hintsRemaining = config.hintsMax;
    state.timeLeft = config.timeSeconds;
    
    state.questions = generateQuizQuestions();
    state.currentQuestionIndex = 0;
    state.matchedCount = 0;
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.totalAttempts = 0;
    state.correctAttempts = 0;
    state.currentDragBatchDone = false;

    elements.quizScoreDisplay.textContent = '0';
    updateComboUI();
    updateHintsUI();
    updateProgressUI();

    if (state.questions.length > 0) {
      renderCurrentQuestion();
    }

    if (state.quizMode === 'challenge') {
      elements.timerBox.style.display = 'flex';
      startQuizTimer();
    } else {
      elements.timerBox.style.display = 'none';
      stopQuizTimer();
    }
  }

  // -- 6g. START MISTAKES QUIZ --
  function startMistakesQuiz() {
    if (state.mistakesList.length === 0) {
      alert("Bạn chưa có từ nào bị sai trong sổ tay!");
      return;
    }
    state.isMistakesQuiz = true;
    
    // Build questions from mistakes
    const config = getLevelConfig();
    const mistakeItems = shuffleArray([...state.mistakesList]);
    
    state.questions = [];
    let remaining = Math.min(config.totalQuestions, mistakeItems.length);
    let itemIndex = 0;
    
    while (remaining > 0 && itemIndex < mistakeItems.length) {
      const typePool = [...config.questionTypes];
      const questionType = typePool[Math.floor(Math.random() * typePool.length)];
      const direction = Math.random() < 0.5 ? 'char-to-romaji' : 'romaji-to-char';
      const item = mistakeItems[itemIndex++];

      if (questionType === 'drag') {
        const batchItems = [item];
        for (let i = 1; i < config.dragBatchSize && itemIndex < mistakeItems.length; i++) {
          batchItems.push(mistakeItems[itemIndex++]);
        }
        const decoys = getDecoyItems(batchItems, config.decoyCount);
        state.questions.push({ type: 'drag', direction, items: batchItems, decoys });
        remaining--;
      } else if (questionType === 'mcq') {
        const wrongItems = getDecoyItems([item], 3);
        const options = shuffleArray([
          { value: direction === 'char-to-romaji' ? item.romaji : item.char, correct: true, char: item.char, romaji: item.romaji },
          ...wrongItems.map(w => ({
            value: direction === 'char-to-romaji' ? w.romaji : w.char,
            correct: false,
            char: w.char,
            romaji: w.romaji
          }))
        ]);
        state.questions.push({ type: 'mcq', direction, item, options });
        remaining--;
      } else {
        state.questions.push({ type: 'typing', direction, item });
        remaining--;
      }
    }

    state.totalQuestions = state.questions.length;
    state.currentQuestionIndex = 0;
    state.matchedCount = 0;
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.totalAttempts = 0;
    state.correctAttempts = 0;
    state.hintsRemaining = config.hintsMax;
    state.timeLeft = config.timeSeconds;
    state.currentDragBatchDone = false;

    elements.quizScoreDisplay.textContent = '0';
    updateComboUI();
    updateHintsUI();

    switchView('quiz-view');

    if (state.questions.length > 0) {
      renderCurrentQuestion();
    }

    if (state.quizMode === 'challenge') {
      elements.timerBox.style.display = 'flex';
      startQuizTimer();
    } else {
      elements.timerBox.style.display = 'none';
      stopQuizTimer();
    }
  }

  // -- 6h. RENDER CURRENT QUESTION --
  function renderCurrentQuestion() {
    if (state.currentQuestionIndex >= state.questions.length) {
      onQuizComplete();
      return;
    }

    const question = state.questions[state.currentQuestionIndex];
    updateProgressUI();

    // Hide all boards
    elements.dragBoard.style.display = 'none';
    elements.mcqBoard.style.display = 'none';
    elements.typingBoard.style.display = 'none';

    // Show appropriate board
    if (question.type === 'drag') {
      renderDragQuestion(question);
    } else if (question.type === 'mcq') {
      renderMCQQuestion(question);
    } else if (question.type === 'typing') {
      renderTypingQuestion(question);
    }
  }

  // -- 6i. UPDATE PROGRESS UI --
  function updateProgressUI() {
    const current = state.currentQuestionIndex + 1;
    const total = state.questions.length;
    elements.questionCounter.textContent = `Câu ${current} / ${total}`;
    elements.progressFill.style.width = `${(state.currentQuestionIndex / total) * 100}%`;

    if (state.currentQuestionIndex < state.questions.length) {
      const q = state.questions[state.currentQuestionIndex];
      const typeLabels = { drag: '🎯 Kéo Thả', mcq: '📝 Trắc Nghiệm', typing: '⌨️ Gõ Đáp Án' };
      elements.questionTypeBadge.textContent = typeLabels[q.type] || 'Quiz';
    }
  }

  function updateHintsUI() {
    if (elements.hintsRemainingCount) {
      if (state.hintsRemaining > 0) {
        elements.hintsRemainingCount.textContent = `(${state.hintsRemaining})`;
        elements.quizHintBtn.style.display = '';
      } else {
        elements.hintsRemainingCount.textContent = '';
        if (state.quizLevel >= 3) {
          elements.quizHintBtn.style.display = 'none';
        }
      }
    }
  }

  // -- 6j. ADVANCE TO NEXT QUESTION --
  function advanceToNextQuestion() {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex >= state.questions.length) {
      setTimeout(onQuizComplete, 500);
    } else {
      setTimeout(() => renderCurrentQuestion(), 600);
    }
  }

  // ======================================================================
  // 7. DRAG & DROP QUIZ (Enhanced with Decoys + Bidirectional)
  // ======================================================================
  function renderDragQuestion(question) {
    elements.dragBoard.style.display = 'block';
    state.currentDragBatchDone = false;
    
    // Combine real items + decoys for the drag sources
    const allDragItems = [...question.items, ...question.decoys];
    const shuffledDragItems = shuffleArray([...allDragItems]);
    
    // Target items are only the real items (shuffled)
    const shuffledTargetItems = shuffleArray([...question.items]);

    // Determine what to show on cards vs targets based on direction
    const isReverse = question.direction === 'romaji-to-char';
    
    // Drag cards show: char (normal) or romaji (reverse)
    // Drop targets show: romaji (normal) or char (reverse)
    elements.draggableContainer.innerHTML = shuffledDragItems.map(item => {
      const displayText = isReverse ? item.romaji : item.char;
      const isDecoy = question.decoys.some(d => d.char === item.char);
      return `
        <div class="drag-card ${isDecoy ? 'decoy-card' : ''}" 
             data-char="${item.char}" data-romaji="${item.romaji}">
          <span class="char-text">${displayText}</span>
        </div>
      `;
    }).join('');

    elements.dropTargetsContainer.innerHTML = shuffledTargetItems.map(item => {
      const displayLabel = isReverse ? item.char : item.romaji;
      return `
        <div class="drop-target" data-romaji="${item.romaji}" data-char="${item.char}">
          <span class="drop-target-label">${displayLabel}</span>
          <span class="drop-target-sub">Thả chữ vào đây</span>
        </div>
      `;
    }).join('');

    // Track matched count for this batch
    state._dragBatchMatched = 0;
    state._dragBatchTotal = question.items.length;

    setupPointerDragEvents();
  }

  function setupPointerDragEvents() {
    const dragCards = elements.draggableContainer.querySelectorAll('.drag-card');
    let activeDragCard = null;
    let ghostElement = null;

    dragCards.forEach(card => {
      card.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sound.playFx('click');

        activeDragCard = card;
        card.classList.add('dragging');

        // Create ghost clone for tactile movement
        ghostElement = document.createElement('div');
        ghostElement.className = 'ghost-drag';
        ghostElement.textContent = card.querySelector('.char-text').textContent;
        ghostElement.style.left = `${e.clientX}px`;
        ghostElement.style.top = `${e.clientY}px`;
        document.body.appendChild(ghostElement);

        // Pointer Move Handler
        const onPointerMove = (moveEvt) => {
          if (!ghostElement) return;
          ghostElement.style.left = `${moveEvt.clientX}px`;
          ghostElement.style.top = `${moveEvt.clientY}px`;

          const targetUnderPointer = document.elementFromPoint(moveEvt.clientX, moveEvt.clientY);
          const dropZone = targetUnderPointer ? targetUnderPointer.closest('.drop-target') : null;

          document.querySelectorAll('.drop-target').forEach(dt => {
            dt.classList.toggle('hover-over', dt === dropZone && !dt.classList.contains('matched'));
          });
        };

        // Pointer Up Handler
        const onPointerUp = (upEvt) => {
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);

          if (ghostElement) {
            ghostElement.remove();
            ghostElement = null;
          }

          if (activeDragCard) {
            activeDragCard.classList.remove('dragging');
          }

          document.querySelectorAll('.drop-target').forEach(dt => dt.classList.remove('hover-over'));

          const targetElement = document.elementFromPoint(upEvt.clientX, upEvt.clientY);
          const dropTarget = targetElement ? targetElement.closest('.drop-target') : null;

          if (dropTarget && !dropTarget.classList.contains('matched') && activeDragCard) {
            handleDropAttempt(activeDragCard, dropTarget);
          }

          activeDragCard = null;
        };

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      });
    });
  }

  function handleDropAttempt(dragCard, dropTarget) {
    state.totalAttempts++;
    const draggedRomaji = dragCard.dataset.romaji;
    const targetRomaji = dropTarget.dataset.romaji;
    const draggedChar = dragCard.dataset.char;

    if (draggedRomaji === targetRomaji) {
      // SUCCESSFUL DROP MATCH
      state.correctAttempts++;
      state.matchedCount++;
      state._dragBatchMatched++;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;

      // If review mistakes quiz, resolve/reduce mistake count
      if (state.isMistakesQuiz) {
        const index = state.mistakesList.findIndex(m => m.char === draggedChar);
        if (index >= 0) {
          state.mistakesList[index].errorCount--;
          if (state.mistakesList[index].errorCount <= 0) {
            state.mistakesList.splice(index, 1);
          }
          saveMistakes();
        }
      }

      // Play chime audio + pronounce Japanese character
      if (state.combo > 1) {
        sound.playFx('combo', state.combo);
      } else {
        sound.playFx('correct');
      }
      sound.speak(draggedChar);

      const points = 10 * Math.min(state.combo, 5);
      state.score += points;
      elements.quizScoreDisplay.textContent = state.score;

      dropTarget.classList.add('matched');
      dropTarget.innerHTML = `
        <span class="matched-char">${draggedChar}</span>
        <span style="font-size: 0.8rem; font-weight: 700; color: #10b981;">${draggedRomaji}</span>
      `;

      dragCard.style.visibility = 'hidden';
      dragCard.style.pointerEvents = 'none';

      updateComboUI();

      // Check if all items in this drag batch are matched
      if (state._dragBatchMatched >= state._dragBatchTotal) {
        state.currentDragBatchDone = true;
        advanceToNextQuestion();
      }

    } else {
      // WRONG DROP ATTEMPT -> Record to Mistakes Notebook!
      state.combo = 0;
      updateComboUI();

      sound.playFx('wrong');

      recordMistake(draggedChar, draggedRomaji);

      dropTarget.classList.add('shake');
      setTimeout(() => dropTarget.classList.remove('shake'), 450);

      if (state.quizMode === 'challenge') {
        state.timeLeft = Math.max(0, state.timeLeft - 3);
        elements.timerCountdown.textContent = state.timeLeft;
      }
    }
  }

  // ======================================================================
  // 8. MCQ QUIZ
  // ======================================================================
  function renderMCQQuestion(question) {
    elements.mcqBoard.style.display = 'block';
    
    const isReverse = question.direction === 'romaji-to-char';
    elements.mcqDirectionBadge.textContent = isReverse ? 'Romaji → Ký tự' : 'Ký tự → Romaji';
    
    // Prompt: show the question side
    const promptText = isReverse ? question.item.romaji : question.item.char;
    elements.mcqPrompt.textContent = promptText;

    // Dynamic font size for prompt
    const promptLen = promptText.length;
    if (promptLen <= 2) {
      elements.mcqPrompt.style.fontSize = '5rem';
    } else if (promptLen <= 4) {
      elements.mcqPrompt.style.fontSize = '3.5rem';
    } else {
      elements.mcqPrompt.style.fontSize = '2.2rem';
    }

    // Speak button
    elements.mcqSpeakBtn.onclick = () => {
      sound.speak(question.item.char);
    };

    // Render options
    elements.mcqOptionsGrid.innerHTML = question.options.map((opt, idx) => `
      <button class="mcq-option" data-index="${idx}">${opt.value}</button>
    `).join('');

    // Add click handlers
    const optionBtns = elements.mcqOptionsGrid.querySelectorAll('.mcq-option');
    optionBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => handleMCQAnswer(question, idx, optionBtns));
    });
  }

  function handleMCQAnswer(question, selectedIndex, allBtns) {
    state.totalAttempts++;
    const selectedOption = question.options[selectedIndex];
    const correctIndex = question.options.findIndex(o => o.correct);

    // Disable all buttons
    allBtns.forEach(btn => btn.classList.add('mcq-disabled'));

    if (selectedOption.correct) {
      // CORRECT
      state.correctAttempts++;
      state.matchedCount++;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;

      allBtns[selectedIndex].classList.add('mcq-correct');

      if (state.combo > 1) {
        sound.playFx('combo', state.combo);
      } else {
        sound.playFx('correct');
      }
      sound.speak(question.item.char);

      const points = 10 * Math.min(state.combo, 5);
      state.score += points;
      elements.quizScoreDisplay.textContent = state.score;

      // Resolve mistake if mistakes quiz
      if (state.isMistakesQuiz) {
        const index = state.mistakesList.findIndex(m => m.char === question.item.char);
        if (index >= 0) {
          state.mistakesList[index].errorCount--;
          if (state.mistakesList[index].errorCount <= 0) {
            state.mistakesList.splice(index, 1);
          }
          saveMistakes();
        }
      }

      updateComboUI();
      advanceToNextQuestion();
    } else {
      // WRONG
      state.combo = 0;
      updateComboUI();
      sound.playFx('wrong');

      allBtns[selectedIndex].classList.add('mcq-wrong');
      allBtns[correctIndex].classList.add('mcq-correct');

      recordMistake(question.item.char, question.item.romaji);

      if (state.quizMode === 'challenge') {
        state.timeLeft = Math.max(0, state.timeLeft - 3);
        elements.timerCountdown.textContent = state.timeLeft;
      }

      // Wait then advance
      setTimeout(() => advanceToNextQuestion(), 1200);
    }
  }

  // ======================================================================
  // 9. TYPING QUIZ
  // ======================================================================
  function renderTypingQuestion(question) {
    elements.typingBoard.style.display = 'block';

    const isReverse = question.direction === 'romaji-to-char';
    elements.typingDirectionBadge.textContent = isReverse ? 'Romaji → Ký tự' : 'Ký tự → Romaji';

    const promptText = isReverse ? question.item.romaji : question.item.char;
    elements.typingPrompt.textContent = promptText;

    // Dynamic font size
    const promptLen = promptText.length;
    if (promptLen <= 2) {
      elements.typingPrompt.style.fontSize = '5rem';
    } else if (promptLen <= 4) {
      elements.typingPrompt.style.fontSize = '3.5rem';
    } else {
      elements.typingPrompt.style.fontSize = '2.2rem';
    }

    // Speak button
    elements.typingSpeakBtn.onclick = () => {
      sound.speak(question.item.char);
    };

    // Reset input
    elements.typingInput.value = '';
    elements.typingInput.classList.remove('typing-correct', 'typing-wrong');
    elements.typingFeedback.textContent = '';
    elements.typingFeedback.className = 'typing-feedback';
    elements.typingInput.disabled = false;
    elements.typingSubmitBtn.disabled = false;

    // Focus input
    setTimeout(() => elements.typingInput.focus(), 100);

    // Handler
    const handleSubmit = () => {
      handleTypingSubmit(question);
    };

    // Remove old listeners by cloning
    const newSubmitBtn = elements.typingSubmitBtn.cloneNode(true);
    elements.typingSubmitBtn.parentNode.replaceChild(newSubmitBtn, elements.typingSubmitBtn);
    elements.typingSubmitBtn = newSubmitBtn;
    newSubmitBtn.addEventListener('click', handleSubmit);

    const newInput = elements.typingInput.cloneNode(true);
    elements.typingInput.parentNode.replaceChild(newInput, elements.typingInput);
    elements.typingInput = newInput;
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
    setTimeout(() => newInput.focus(), 100);
  }

  function handleTypingSubmit(question) {
    const userAnswer = elements.typingInput.value.trim().toLowerCase();
    if (!userAnswer) return;

    state.totalAttempts++;
    const isReverse = question.direction === 'romaji-to-char';
    const correctAnswer = isReverse ? question.item.char : question.item.romaji;

    elements.typingInput.disabled = true;
    elements.typingSubmitBtn.disabled = true;

    if (userAnswer === correctAnswer.toLowerCase()) {
      // CORRECT
      state.correctAttempts++;
      state.matchedCount++;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;

      elements.typingInput.classList.add('typing-correct');
      elements.typingFeedback.textContent = '✅ Chính xác!';
      elements.typingFeedback.className = 'typing-feedback feedback-correct';

      if (state.combo > 1) {
        sound.playFx('combo', state.combo);
      } else {
        sound.playFx('correct');
      }
      sound.speak(question.item.char);

      const points = 10 * Math.min(state.combo, 5);
      state.score += points;
      elements.quizScoreDisplay.textContent = state.score;

      // Resolve mistake if mistakes quiz
      if (state.isMistakesQuiz) {
        const index = state.mistakesList.findIndex(m => m.char === question.item.char);
        if (index >= 0) {
          state.mistakesList[index].errorCount--;
          if (state.mistakesList[index].errorCount <= 0) {
            state.mistakesList.splice(index, 1);
          }
          saveMistakes();
        }
      }

      updateComboUI();
      advanceToNextQuestion();
    } else {
      // WRONG
      state.combo = 0;
      updateComboUI();
      sound.playFx('wrong');

      elements.typingInput.classList.add('typing-wrong');
      elements.typingFeedback.innerHTML = `❌ Sai! Đáp án đúng: <strong>${correctAnswer}</strong>`;
      elements.typingFeedback.className = 'typing-feedback feedback-wrong';

      recordMistake(question.item.char, question.item.romaji);

      if (state.quizMode === 'challenge') {
        state.timeLeft = Math.max(0, state.timeLeft - 3);
        elements.timerCountdown.textContent = state.timeLeft;
      }

      setTimeout(() => advanceToNextQuestion(), 1500);
    }
  }

  // ======================================================================
  // 10. QUIZ UTILITIES (Timer, Combo, Hint)
  // ======================================================================
  function updateComboUI() {
    if (state.combo > 1) {
      elements.comboBadge.classList.add('active');
      elements.comboCountDisplay.textContent = state.combo;
    } else {
      elements.comboBadge.classList.remove('active');
    }
  }

  function startQuizTimer() {
    stopQuizTimer();
    elements.timerCountdown.textContent = state.timeLeft;

    state.timerId = setInterval(() => {
      state.timeLeft--;
      elements.timerCountdown.textContent = state.timeLeft;

      if (state.timeLeft <= 10 && state.timeLeft > 0) {
        sound.playFx('tick');
      }

      if (state.timeLeft <= 0) {
        stopQuizTimer();
        onQuizComplete(true);
      }
    }, 1000);
  }

  function stopQuizTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function showHint() {
    if (state.hintsRemaining <= 0) return;
    
    sound.playFx('click');
    state.hintsRemaining--;
    updateHintsUI();

    if (state.currentQuestionIndex >= state.questions.length) return;
    const question = state.questions[state.currentQuestionIndex];

    if (question.type === 'drag') {
      // Highlight a matching pair
      const unmatchedTargets = Array.from(elements.dropTargetsContainer.querySelectorAll('.drop-target:not(.matched)'));
      if (unmatchedTargets.length === 0) return;

      const targetToHint = unmatchedTargets[0];
      const targetRomaji = targetToHint.dataset.romaji;

      const sourceCard = Array.from(elements.draggableContainer.querySelectorAll('.drag-card')).find(
        c => c.dataset.romaji === targetRomaji && c.style.visibility !== 'hidden'
      );

      if (targetToHint && sourceCard) {
        targetToHint.classList.add('hover-over');
        sourceCard.style.transform = 'scale(1.2)';
        sourceCard.style.borderColor = 'var(--accent-gold)';

        setTimeout(() => {
          targetToHint.classList.remove('hover-over');
          sourceCard.style.transform = '';
          sourceCard.style.borderColor = '';
        }, 1500);
      }
    } else if (question.type === 'mcq') {
      // Remove one wrong option
      const wrongBtns = Array.from(elements.mcqOptionsGrid.querySelectorAll('.mcq-option:not(.mcq-disabled):not(.mcq-correct)'));
      const wrongOptions = wrongBtns.filter((btn, idx) => !question.options[parseInt(btn.dataset.index)].correct);
      if (wrongOptions.length > 0) {
        const toRemove = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        toRemove.classList.add('mcq-disabled');
      }
    } else if (question.type === 'typing') {
      // Show first letter
      const isReverse = question.direction === 'romaji-to-char';
      const correctAnswer = isReverse ? question.item.char : question.item.romaji;
      const hintChars = correctAnswer.substring(0, Math.ceil(correctAnswer.length / 2));
      elements.typingFeedback.textContent = `💡 Gợi ý: ${hintChars}...`;
      elements.typingFeedback.className = 'typing-feedback';
      elements.typingFeedback.style.color = 'var(--accent-gold)';
    }
  }

  // ======================================================================
  // 11. QUIZ COMPLETION & CONFETTI CELEBRATION
  // ======================================================================
  function onQuizComplete(isTimeout = false) {
    stopQuizTimer();

    // Update progress bar to 100%
    elements.progressFill.style.width = '100%';

    state.totalScore += state.score;
    localStorage.setItem('kana_total_score', state.totalScore);
    elements.totalScoreDisplay.textContent = state.totalScore;

    const accuracy = state.totalAttempts > 0 
      ? Math.round((state.correctAttempts / state.totalAttempts) * 100)
      : 100;

    let rating = '⭐⭐⭐';
    if (accuracy < 60 || isTimeout) rating = '⭐';
    else if (accuracy < 85) rating = '⭐⭐';

    if (isTimeout && state.matchedCount < state.totalQuestions) {
      elements.modalEmoji.textContent = '⏰';
      elements.modalTitle.textContent = 'Hết Giờ!';
      elements.modalSubtitle.textContent = 'Hãy thử lại để đạt kết quả cao hơn nhé!';
    } else {
      elements.modalEmoji.textContent = '🎉';
      elements.modalTitle.textContent = 'Hoàn Thành Xuất Sắc!';
      elements.modalSubtitle.textContent = state.isMistakesQuiz ? 'Bạn đã sửa được các từ lỗi sai!' : 'Bạn đã vượt qua bài kiểm tra!';
      sound.playFx('complete');
      triggerConfetti();
    }

    elements.modalScore.textContent = state.score;
    elements.modalAccuracy.textContent = `${accuracy}%`;
    elements.modalMaxCombo.textContent = `x${state.maxCombo}`;
    elements.modalRating.textContent = rating;

    elements.resultModal.classList.add('active');
  }

  // ======================================================================
  // 12. FLASHCARD EXPLORER VIEW LOGIC
  // ======================================================================
  function renderExplorerGrid() {
    const group = getCurrentGroup();
    elements.explorerGrid.innerHTML = group.items.map(item => `
      <div class="explorer-card" data-char="${item.char}">
        <span class="explorer-char">${item.char}</span>
        <span class="explorer-romaji">${item.romaji}</span>
      </div>
    `).join('');

    elements.explorerGrid.querySelectorAll('.explorer-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playFx('click');
        sound.speak(card.dataset.char);
      });
    });
  }

  // ======================================================================
  // 13. MISTAKES NOTEBOOK VIEW LOGIC (SỔ TAY ÔN TẬP LỖI SAI)
  // ======================================================================
  function renderMistakesView() {
    updateMistakesBadgeCount();

    if (state.mistakesList.length === 0) {
      elements.mistakesGridContainer.innerHTML = `
        <div class="empty-mistakes-box">
          <div style="font-size: 4rem;">🎉</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-bright);">
            Tuyệt vời! Bạn chưa có lỗi sai nào
          </h3>
          <p style="color: var(--text-muted); max-width: 400px;">
            Khi bạn kéo thả sai trong phần Game Kiểm Tra, hệ thống sẽ tự động tổng hợp những chữ hay nhầm lẫn vào đây để bạn ôn luyện lại.
          </p>
        </div>
      `;
      return;
    }

    elements.mistakesGridContainer.innerHTML = state.mistakesList.map((m, idx) => `
      <div class="mistake-card">
        <div class="mistake-card-top">
          <span class="mistake-char">${m.char}</span>
          <span class="mistake-count-badge">❌ Sai ${m.errorCount} lần</span>
        </div>

        <div class="mistake-romaji">${m.romaji}</div>

        <p class="mistake-mnemonic">
          ${m.mnemonicIcon || '💡'} ${m.mnemonicText || m.hint || 'Ký tự hay nhầm lẫn'}
        </p>

        ${m.example ? `<div style="font-size: 0.85rem; font-weight: 700; color: var(--text-bright); margin-bottom: 0.5rem;">Ví dụ: ${m.example} (${m.meaning})</div>` : ''}

        <div style="display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 0.5rem;">
          <button class="sound-speak-btn" style="padding: 0.4rem 0.9rem; font-size: 0.85rem;" onclick="window.speakMistakeChar('${m.char}')">
            🔊 Nghe
          </button>
          <button class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; color: var(--color-error);" onclick="window.removeMistakeItem(${idx})">
            🗑️ Xóa
          </button>
        </div>
      </div>
    `).join('');
  }

  window.speakMistakeChar = (char) => {
    sound.speak(char);
  };

  window.removeMistakeItem = (index) => {
    sound.playFx('click');
    state.mistakesList.splice(index, 1);
    saveMistakes();
    renderMistakesView();
  };

  // ======================================================================
  // 14. EVENT LISTENERS SETUP
  // ======================================================================
  function setupEventListeners() {
    // Theme toggle
    elements.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('kana_theme', next);
      elements.themeToggleBtn.textContent = next === 'dark' ? '🌙' : '🌸';
      sound.playFx('click');
    });

    // Sound mute toggle
    elements.soundToggleBtn.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      elements.soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
    });

    // Logo click home reset
    elements.logoHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('study-view');
    });

    // Alphabet buttons (Hiragana / Katakana / Kanji / Romaji)
    elements.alphabetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playFx('click');
        switchAlphabet(btn.dataset.alphabet);
      });
    });

    // Mode tabs
    elements.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sound.playFx('click');
        switchView(tab.dataset.view);
      });
    });

    // Group dropdown selector
    elements.groupSelect.addEventListener('change', (e) => {
      state.groupIndex = parseInt(e.target.value, 10);
      state.cardIndex = 0;
      sound.playFx('click');
      renderStudyCard();
      renderExplorerGrid();
      if (state.view === 'quiz-view') {
        startNewQuiz();
      }
    });

    // Study 3D Card flip
    elements.flipCard.addEventListener('click', () => {
      sound.playFx('flip');
      elements.flipCard.classList.toggle('flipped');
    });

    // Card Speak audio button
    elements.cardSpeakBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = getCurrentCard();
      sound.speak(item.char);
    });

    // Prev / Next card
    elements.prevCardBtn.addEventListener('click', prevStudyCard);
    elements.nextCardBtn.addEventListener('click', nextStudyCard);

    // Launch Quiz button from Study mode
    elements.startQuizNowBtn.addEventListener('click', () => {
      sound.playFx('click');
      switchView('quiz-view');
    });

    // Level selector buttons
    elements.levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playFx('click');
        state.quizLevel = parseInt(btn.dataset.level, 10);
        localStorage.setItem('kana_quiz_level', state.quizLevel);
        updateLevelUI();
        startNewQuiz();
      });
    });

    // Quiz mode toggle (Practice vs Challenge)
    elements.quizModeToggleBtn.addEventListener('click', () => {
      sound.playFx('click');
      state.quizMode = state.quizMode === 'challenge' ? 'practice' : 'challenge';
      elements.quizModeToggleBtn.textContent = state.quizMode === 'challenge' ? '⏱️ Thử thách' : '🧘 Luyện tập';
      startNewQuiz();
    });

    // Quiz Hint button
    elements.quizHintBtn.addEventListener('click', showHint);

    // Mistakes View buttons
    if (elements.practiceMistakesBtn) {
      elements.practiceMistakesBtn.addEventListener('click', () => {
        sound.playFx('click');
        startMistakesQuiz();
      });
    }

    if (elements.clearMistakesBtn) {
      elements.clearMistakesBtn.addEventListener('click', () => {
        if (state.mistakesList.length === 0) return;
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử từ làm sai không?")) {
          sound.playFx('click');
          state.mistakesList = [];
          saveMistakes();
          renderMistakesView();
        }
      });
    }

    // Modal buttons
    elements.modalRestartBtn.addEventListener('click', () => {
      sound.playFx('click');
      elements.resultModal.classList.remove('active');
      if (state.isMistakesQuiz) {
        startMistakesQuiz();
      } else {
        startNewQuiz();
      }
    });

    elements.modalNextBtn.addEventListener('click', () => {
      sound.playFx('click');
      elements.resultModal.classList.remove('active');
      if (state.isMistakesQuiz) {
        switchView('mistakes-view');
      } else {
        const alphabetData = JAPANESE_DATA[state.alphabet];
        const groups = alphabetData ? alphabetData.groups : [];
        state.groupIndex = (state.groupIndex + 1) % groups.length;
        state.cardIndex = 0;
        populateGroupDropdown();
        renderStudyCard();
        renderExplorerGrid();
        switchView('study-view');
      }
    });
  }

  // ======================================================================
  // 15. VISUAL BACKGROUND ANIMATIONS (SAKURA PETALS & CONFETTI)
  // ======================================================================
  function initSakuraBackground() {
    const canvas = elements.sakuraCanvas;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: `rgba(255, ${Math.floor(Math.random() * 50 + 150)}, 180, ${Math.random() * 0.4 + 0.3})`
    }));

    function animateSakura() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animateSakura);
    }

    animateSakura();
  }

  function triggerConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: ['#ff4d8d', '#00f2fe', '#ffc300', '#10b981', '#9d4edd'][Math.floor(Math.random() * 5)],
      alpha: 1
    }));

    let startTime = Date.now();

    function renderConfetti() {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive && Date.now() - startTime < 3000) {
        requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    renderConfetti();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  init();
});
