const correctAnswers = ["new-delhi", "blue-whale", "11", "cherryblossom", "incan"];

document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const usernameSection = document.getElementById("username-section");
    const usernameInput = document.getElementById("username");
    const startQuizButton = document.getElementById("start-quiz");
    const quizSection = document.getElementById("quiz");
    const questions = document.querySelectorAll('.question');
    const restartButton = document.getElementById('restart');
    const nextQuestionButton = document.getElementById('next-question');
    const scoreDisplay = document.getElementById('score-value');
    const timers = document.querySelectorAll('.timer');
    const scoreTick = document.getElementById('score-tick');
    const scoreCross = document.getElementById('score-cross');

    let currentQuestion = 0;
    let countdown = 30;
    let interval;
    let score = 0;
    let selectedAnswer = null;
    let timerStarted = false;

    startQuizButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        if (username) {
            usernameSection.style.display = 'none';
            quizSection.style.display = 'block';
            header.innerHTML = `Welcome, ${username}!`;

            if (!timerStarted) {
                timerStarted = true;
                startCountdown();
            }

            showQuestion(currentQuestion);
        } else {
            return "username invalid";
        }
    });

    function updateAnswerStatus(isCorrect) {
        const currentQuestionElement = questions[currentQuestion];
        const answerButtons = currentQuestionElement.querySelectorAll('input[type="radio"]');
        answerButtons.forEach((button) => {
            const label = button.nextElementSibling;
            if (button.checked) {
                if (isCorrect) {
                    label.classList.add('correct');
                } else {
                    label.classList.add('incorrect');
                }
            }
        });
    }

    function clearAnswerStatus() {
        const currentQuestionElement = questions[currentQuestion];
        const answerLabels = currentQuestionElement.querySelectorAll('label');
        answerLabels.forEach((label) => {
            label.classList.remove('correct', 'incorrect');
        });
    }

    function checkAnswer() {
        const correctAnswer = correctAnswers[currentQuestion];
        const selectedAnswerElement = questions[currentQuestion].querySelector('input[type="radio"]:checked');

        if (selectedAnswerElement && selectedAnswerElement.value === correctAnswer) {
            updateAnswerStatus(true);
            score++;
            scoreDisplay.textContent = `${score}/5`;;
            scoreCross.innerHTML = '';
            scoreTick.innerHTML = '✔';
        } else if (selectedAnswerElement && selectedAnswerElement.value != correctAnswer) {
            updateAnswerStatus(false);
            scoreTick.innerHTML = '';
            scoreCross.innerHTML = '✘';
        }
        else {
        }
    }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.style.display = 'block';
                const timerElements = document.querySelectorAll('.timer');
                if (timerElements[currentQuestion]) {
                    timerElements[currentQuestion].textContent = `${countdown} seconds remaining`;
                }
            } else {
                question.style.display = 'none';
            }
        });
        countdown = 30;
    }


    function startCountdown() {
        clearInterval(interval);

        interval = setInterval(function () {
            const timerElement = timers[currentQuestion];
            if (countdown > 0) {
                countdown--;
                if (timerElement) {
                    timerElement.textContent = `${countdown} seconds remaining`;
                }
            } else {
                clearInterval(interval);
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion(currentQuestion);
                } else {
                    quizSection.style.display = 'block';
                }
            }
        }, 1000);
    }

    nextQuestionButton.addEventListener('click', function () {
        checkAnswer();
        clearAnswerStatus();
        showNextQuestion();
    });

    const answerButtons = document.querySelectorAll('input[type="radio"]');
    answerButtons.forEach((button) => {
        button.addEventListener('change', function () {
            selectedAnswer = button;
        });
    });

    function showNextQuestion() {
        questions[currentQuestion].style.display = 'none';
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
            startCountdown();
        } else {
            const congratulationsBanner = document.getElementById('congratulations-banner');
            congratulationsBanner.style.display = 'block';
            document.getElementById('questions-box').style.height = '300px';
        }
    }

    restartButton.addEventListener('click', function () {
        window.location.reload();
    });

    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const feedbackText = document.getElementById("feedback-text").value;

        console.log("Feedback submitted:", feedbackText);

        document.getElementById("feedback-text").value = "";
    });
});

