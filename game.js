let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Trainer Marking Language',
        choice2: 'Hyper Text Marketing Language',
        choice3: 'Hyper Text Markup Language',
        choice4: 'Hyper Text Markup Leveler',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'What does CSS stand for?',
        choice1: 'Cascading Style Sheets',
        choice2: 'Creative Style Sheets',
        choice3: 'Computer Style Sheets',
        choice4: 'Colorful Style Sheets',
        answer: 1,
    },
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    }
];

const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-value"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;
const CORRECT_BONUS = 10;


function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getQuestion();
}

function getQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= questions.length) {
        return window.location.assign(`/end.html?score=${score}`);
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${questions.length}`;
    progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach(option => {
        const number = option.dataset["number"];
        option.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

options.forEach(option => {
    option.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target.closest(".option-value");
        const selectedAnswer = selectedOption.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedOption.classList.add(classToApply);

        setTimeout(() => {
            selectedOption.classList.remove(classToApply);
            getQuestion();
        }, 1000);
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}
startGame();