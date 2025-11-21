import { Question } from "../types";
import { quizData } from "./_mock.js";

const startScreen = document.querySelector(".start-screen")!;
const quizContainer = document.querySelector(".quiz-container")!;
const resultContainer = document.querySelector(
  ".result-container"
)! as HTMLElement;

const categoryButtons = document.querySelectorAll(".category");

const questionElement = document.querySelector(".question")!
const optionsContainer = document.querySelector(".options")!;

const nextButton = document.querySelector(".next-btn")! as HTMLButtonElement;

const categoryNameSpan = document.querySelector(
  ".category-name span"
)! as HTMLElement;
const currentQuestionSpan = document.querySelector(".current")!;
const totalQuestionsSpan = document.querySelector(".total")!;

const scoreSpan = document.querySelector(".score span")!;
const finalScoreSpan = document.querySelector(".final-score")!;
const totalQuestionsResultSpan = document.querySelector(
  ".total-questions"
)!;

const restartButton = document.querySelector(
  ".restart-btn"
)!;

let currentCategory: keyof typeof quizData = "technology";
let currentQuestionIndex = 0;
let score = 0;
let questions: Question[] = [];

function startQuiz(category: keyof typeof quizData): void {
  currentCategory = category;
  questions = quizData[category];
  currentQuestionIndex = 0;
  score = 0;

  startScreen.classList.add("hide");
  quizContainer.classList.remove("hide");
  resultContainer.classList.add("hide");

  categoryNameSpan.textContent = category;
  totalQuestionsSpan.textContent = String(questions.length);
  scoreSpan.textContent = String(score);

  showQuestion();
}

function showQuestion(): void {
  const question = questions[currentQuestionIndex];
  currentQuestionSpan.textContent = String(currentQuestionIndex + 1);
  questionElement.textContent = question.question;

  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });

  nextButton.disabled = true;
}

function selectOption(selectedIndex: number): void {
  const optionButtons = optionsContainer.querySelectorAll(
    ".option"
  ) as NodeListOf<HTMLButtonElement>;
  const question = questions[currentQuestionIndex];

  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === question.correct) {
    optionButtons[selectedIndex].classList.add("correct");
    score++;
    scoreSpan.textContent = String(score);
  } else {
    optionButtons[selectedIndex].classList.add("incorrect");
    optionButtons[question.correct].classList.add("correct");
  }

  nextButton.disabled = false;
}

function showResult(): void {
  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");

  finalScoreSpan.textContent = String(score);
  totalQuestionsResultSpan.textContent = String(questions.length);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = (button as HTMLElement).dataset
      .category as keyof typeof quizData;
    startQuiz(category);
  });
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", () => {
  startScreen.classList.remove("hide");
  resultContainer.classList.add("hide");
});
