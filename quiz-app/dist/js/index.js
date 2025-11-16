import { quizData } from "./_mock.js";
const startScreen = document.querySelector(".start-screen");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const categoryButtons = document.querySelectorAll(".category");
const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");
const categoryNameSpan = document.querySelector(".category-name span");
const currentQuestionSpan = document.querySelector(".current");
const totalQuestionsSpan = document.querySelector(".total");
const scoreSpan = document.querySelector(".score span");
const finalScoreSpan = document.querySelector(".final-score");
const totalQuestionsResultSpan = document.querySelector(".total-questions");
const restartButton = document.querySelector(".restart-btn");
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
function startQuiz(category) {
    currentCategory = category;
    questions = quizData[category];
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    resultContainer.classList.add("hide");
    categoryNameSpan.textContent =
        category.charAt(0).toUpperCase() + category.slice(1);
    totalQuestionsSpan.textContent = questions.length;
    scoreSpan.textContent = score;
    showQuestion();
}
function showQuestion() {
    const question = questions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    nextButton.disabled = true;
}
function selectOption(selectedIndex) {
    const options = optionsContainer.querySelectorAll(".option");
    const question = questions[currentQuestionIndex];
    options.forEach((option) => (option.disabled = true));
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add("correct");
        score++;
        scoreSpan.textContent = score;
    }
    else {
        options[selectedIndex].classList.add("incorrect");
        options[question.correct].classList.add("correct");
    }
    nextButton.disabled = false;
}
function showResult() {
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    finalScoreSpan.textContent = score;
    totalQuestionsResultSpan.textContent = questions.length;
}
categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        startQuiz(button.dataset.category);
    });
});
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showResult();
    }
});
restartButton.addEventListener("click", () => {
    startScreen.classList.remove("hide");
    resultContainer.classList.add("hide");
});
