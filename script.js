document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const usernameSection = document.getElementById("username-section");
    const usernameInput = document.getElementById("username");
    const startQuizButton = document.getElementById("start-quiz");
    const quizSection = document.getElementById("quiz");
    const questions = document.querySelectorAll('.question');
    const timers = document.querySelectorAll('.timer');
    const restartButton = document.getElementById('restart');
    const nextQuestionButton = document.getElementById('next-question');
    const scoreDisplay = document.getElementById('score-value');

    let currentQuestion = 0;
    let countdown = 30;
    let interval;
    let score = 0;
    let selectedAnswer = null;

    startQuizButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        if (username) {
            usernameSection.style.display = 'none';
            quizSection.style.display = 'block';
            header.innerHTML = `Welcome, ${username}!`;

            showQuestion(currentQuestion);
            startCountdown();
        } else {
            // Handle an empty username
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
                    scoreDisplay.textContent = score;
                } else {
                    updateAnswerStatus(false);
                }
            }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.style.display = 'block';
                countdown = 30;
                clearInterval(interval);
                startCountdown();
            } else {
                question.style.display = 'none';
            }
        });
    }

    function startCountdown() {
                interval = setInterval(function () {
                    countdown--;
                    const timerElements = document.querySelectorAll('.timer');
                    if (timerElements[currentQuestion]) {
                        timerElements[currentQuestion].textContent = `${countdown} seconds remaining`;
                    }

                    if (countdown <= 0) {
                        clearInterval(interval);
                        currentQuestion++;
                        if (currentQuestion < questions.length) {
                            showQuestion(currentQuestion);
                        }
                    }
                }, 1000);
            }

    restartButton.addEventListener('click', function () {
                clearInterval(interval);
                countdown = 30;
                currentQuestion = 0;
                score = 0;
                scoreDisplay.textContent = score;
                showQuestion(currentQuestion);
            });

        nextQuestionButton.addEventListener('click', function () {
            if (currentQuestion < questions.length - 1) {
                checkAnswer();
                clearAnswerStatus();
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                checkAnswer();
                nextQuestionButton.style.display = 'none';
            }
        });

        const answerButtons = document.querySelectorAll('input[type="radio"]');
        answerButtons.forEach((button) => {
            button.addEventListener('change', function () {
                selectedAnswer = button;
            });
        });

        const correctAnswers = ["new-delhi", "blue-whale", "11", "cherryblossom", "incan"];
        showQuestion(currentQuestion);
    });