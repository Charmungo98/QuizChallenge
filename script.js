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
    const timers = document.querySelectorAll('.timer'); // Move this line inside the event listener

    let currentQuestion = 0;
    let countdown = 30;
    let interval;
    let score = 0;
    let selectedAnswer = null;
    let timerStarted = false; // Add this variable

    startQuizButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        if (username) {
            usernameSection.style.display = 'none';
            quizSection.style.display = 'block';
            header.innerHTML = `Welcome, ${username}!`;

            if (!timerStarted) { // Start the timer only if it hasn't been started before
                timerStarted = true;
                startCountdown();
            }

            showQuestion(currentQuestion);
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
                // Ensure that the countdown is displayed correctly
                const timerElements = document.querySelectorAll('.timer');
                if (timerElements[currentQuestion]) {
                    timerElements[currentQuestion].textContent = `${countdown} seconds remaining`;
                }
            } else {
                question.style.display = 'none';
            }
        });
        countdown = 30; // Reset the countdown for the current question
    }


    function startCountdown() {
        clearInterval(interval); // Clear any existing intervals

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
 // Reset the countdown for the next question
                    showQuestion(currentQuestion);
                } else {
                    // Handle the end of the quiz, e.g., show the final score
                    quizSection.style.display = 'none';
                    // You can add a "Quiz Over" message or any other desired behavior here
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
            startCountdown(); // Start the timer for the next question
        } else {
            // Handle the end of the quiz, e.g., show the final score
            quizSection.style.display = 'none';
            // You can add a "Quiz Over" message or any other desired behavior here
        }
    }

    restartButton.addEventListener('click', function () {
        clearInterval(interval);
        countdown = 30;
        currentQuestion = 0;
        score = 0;
        scoreDisplay.textContent = score;
        showQuestion(currentQuestion);
        startCountdown(); // Start the timer for the first question
    });
});
