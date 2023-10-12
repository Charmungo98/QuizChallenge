let interval;

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

    restartButton.addEventListener('click', function () {
        clearInterval(interval);
        countdown = 30;
        currentQuestion = 0;
        score = 0;
        scoreDisplay.textContent = score;
        showQuestion(currentQuestion);
    });

    questions.forEach((question) => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', function () {
                nextQuestionButton.style.display = 'block';
                clearInterval(interval);
            });
        });
    });

    nextQuestionButton.addEventListener('click', function () {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    function updateScore(correct) {
        if (correct) {
            score++; // Increment the score if the answer is correct
            scoreDisplay.textContent = score; // Update the displayed score
        }
    }

    showQuestion(currentQuestion);

const answerButtons = document.querySelectorAll('input[type="radio"]');

answerButtons.forEach((button) => {
    button.addEventListener('click', function () {
        if (currentQuestion === 0) {
            if (button.value === 'new-delhi') {
                updateScore(true);
            }
        } else if (currentQuestion === 1) {
            if (button.value === 'blue-whale') {
                updateScore(true);
            }
        } else if (currentQuestion === 2) {
            if (button.value === '11') {
                updateScore(true);
            }
        }
        else if (currentQuestion === 3) {
            if (button.value === 'cherryblossom') {
                updateScore(true);
            }
        }
        else if (currentQuestion === 4) {
            if (button.value === 'incan') {
                updateScore(true);
            }
        }

        nextQuestionButton.style.display = 'block';
        clearInterval(interval);
    });
});
});