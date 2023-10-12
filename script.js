document.addEventListener("DOMContentLoaded", function () {
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
        const currentQuestionElement = questions[currentQuestion];
        const correctAnswer = currentQuestionElement.querySelector(`input[type="radio"][value="${correctAnswers[currentQuestion]}"]`);

        if (selectedAnswer === correctAnswer) {
            updateAnswerStatus(true);
            score++;
            scoreDisplay.textContent = score;
        } else {
            updateAnswerStatus(false);
        }
    }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.style.display = 'none';
            timers[i].style.display = 'none';
        });

        if (index < questions.length) {
            questions[index].style.display = 'block';
            timers[index].style.display = 'block';
            nextQuestionButton.style.display = 'block';
            countdown = 30;
            clearInterval(interval);
            startCountdown();
        }
    }

    function startCountdown() {
        interval = setInterval(function () {
            countdown--;
            timers[currentQuestion].querySelector('span').textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                currentQuestion++;
                countdown = 30;
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
