document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question');
    const timers = document.querySelectorAll('.timer span');
    const restartButton = document.getElementById('restart');

    let currentQuestion = 0;

    timers[currentQuestion].textContent = 30;
    showQuestion(currentQuestion);
    
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
                }
            }
        }, 1000);
    }
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.style.display = i === index ? 'block' : 'none';
        });
        startCountdown(timers[index], 30);
    }
    
    restartButton.addEventListener('click', function () {
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });
});


