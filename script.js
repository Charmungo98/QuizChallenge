document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question');
    const timers = document.querySelectorAll('.timer');
    const restartButton = document.getElementById('restart');
    const nextQuestionButton = document.getElementById('next-question');

    let currentQuestion = 0;
    let countdown = 30;
    let interval;

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
            question.style.display = 'none'; // Hide all questions
            timers[i].style.display = 'none'; // Hide all timers
        });

        if (index < questions.length) {
            questions[index].style.display = 'block'; // Show the current question
            timers[index].style.display = 'block'; // Show the current timer
            nextQuestionButton.style.display = 'none'; // Hide the "Next Question" button
            countdown = 30; // Reset the countdown timer to 30 seconds
            clearInterval(interval); // Clear the previous interval
            startCountdown();
        }
    }

    restartButton.addEventListener('click', function () {
        clearInterval(interval);
        countdown = 30;
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    questions.forEach((question, i) => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', function () {
                nextQuestionButton.style.display = 'block'; // Show the "Next Question" button
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
            score++;
        }
        scoreElement.textContent = score;
    }

    showQuestion(currentQuestion);
});
