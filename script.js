document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question');
    const timers = document.querySelectorAll('.timer span');
    const restartButton = document.getElementById('restart');

    let currentQuestion = 0;

    timers[currentQuestion].textContent = 30;
    showQuestion(currentQuestion);
    // Function to start the countdown for a timer
    function startCountdown(timerElement, seconds) {
        let countdown = seconds;
        const interval = setInterval(function () {
            countdown--;
            timerElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion(currentQuestion);
                } else {
                    // Handle the end of the quiz, e.g., show a completion message.
                }
            }
        }, 1000);
    }

