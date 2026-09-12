// ===============================
// QUESTION BANK
// ===============================

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used to style web pages?",
    options: ["Python", "CSS", "Java", "C++"],
    answer: 1
  },
  {
    question: "Which language makes a website interactive?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 2
  },
  {
    question: "Which symbol is used for an ID selector in CSS?",
    options: [".", "#", "@", "*"],
    answer: 1
  },
  {
    question: "Which method prints something in the browser console?",
    options: [
      "console.log()",
      "print()",
      "display()",
      "write.log()"
    ],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["font-style", "background-color", "color", "text-size"],
    answer: 2
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "constant"],
    answer: 2
  },
  {
    question: "What is the correct file extension for JavaScript?",
    options: [".java", ".script", ".js", ".javascript"],
    answer: 2
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<image>", "<img>", "<picture>", "<src>"],
    answer: 1
  },
  {
    question: "Which operator is used for strict equality?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },
  {
    question: "Which CSS property changes the background color?",
    options: ["color", "background-color", "bg-color", "background"],
    answer: 1
  },
  {
    question: "Which HTML tag creates the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "push()", "shift()", "add()"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Style Sheets"
    ],
    answer: 1
  },
  {
    question: "Which HTML tag creates a paragraph?",
    options: ["<text>", "<paragraph>", "<p>", "<para>"],
    answer: 2
  },
  {
    question: "Which function converts a string to an integer?",
    options: ["parseInt()", "toInteger()", "NumberString()", "parseString()"],
    answer: 0
  },
  {
    question: "Which CSS property controls space inside an element?",
    options: ["margin", "padding", "border", "spacing"],
    answer: 1
  },
  {
    question: "Which keyword defines a function in JavaScript?",
    options: ["def", "function", "func", "method"],
    answer: 1
  },
  {
    question: "Which HTML attribute provides alternative text for an image?",
    options: ["title", "src", "alt", "href"],
    answer: 2
  }
];

// ===============================
// QUIZ VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// This will contain the 5 randomly selected questions
let quizQuestions = [];

// ===============================
// HTML ELEMENTS
// ===============================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score-display");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// ===============================
// BUTTON EVENTS
// ===============================

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// ===============================
// RANDOM QUESTION FUNCTION
// ===============================

function getRandomQuestions() {
  // Make a copy of the original question bank
  const shuffled = [...questions];

  // Shuffle the questions randomly
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return only 5 questions
  return shuffled.slice(0, 5);
}

// ===============================
// START QUIZ
// ===============================

function startQuiz() {
  currentQuestion = 0;
  score = 0;

  // Select 5 new random questions
  quizQuestions = getRandomQuestions();

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}

// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {
  selectedAnswer = null;
  nextBtn.disabled = true;

  const question = quizQuestions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  scoreDisplay.textContent = `Score: ${score}`;

  questionText.textContent = question.question;

  progressBar.style.width =
    `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");

    optionElement.classList.add("option");
    optionElement.textContent = option;

    optionElement.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsContainer.appendChild(optionElement);
  });
}

// ===============================
// SELECT ANSWER
// ===============================

function selectAnswer(index) {
  // Prevent selecting multiple answers
  if (selectedAnswer !== null) return;

  selectedAnswer = index;

  const question = quizQuestions[currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach((option, i) => {
    option.style.pointerEvents = "none";

    // Show the correct answer
    if (i === question.answer) {
      option.classList.add("correct");
    }

    // Show the wrong answer
    if (i === index && index !== question.answer) {
      option.classList.add("wrong");
    }
  });

  // Increase score if answer is correct
  if (index === question.answer) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  nextBtn.disabled = false;
}

// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===============================
// SHOW RESULT
// ===============================

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = `${score} / ${quizQuestions.length}`;

  if (score === quizQuestions.length) {
    resultMessage.textContent = "Perfect score! 🏆";
  } else if (score >= 3) {
    resultMessage.textContent = "Great job! Keep learning! 🌟";
  } else {
    resultMessage.textContent = "Good effort! Practice makes perfect! 💪";
  }
}

// ===============================
// RESTART QUIZ
// ===============================

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  // Select a fresh set of random questions
  quizQuestions = getRandomQuestions();

  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}