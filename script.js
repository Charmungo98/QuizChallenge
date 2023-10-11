document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question-active'); 
    const timers = document.querySelectorAll('.timer-active'); 
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
                } else {
                   
                }
            }
        }, 1000);
    }

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.remove('active');
            timers[i].classList.remove('active');
        });

        questions[index].classList.add('active');
        timers[index].classList.add('active');
        startCountdown();
    }

    restartButton.addEventListener('click', function () {
        clearInterval(interval);
        countdown = 30;
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    nextQuestionButton.addEventListener('click', function () {
        if (currentQuestion < questions.length - 1) {
            clearInterval(interval);
            countdown = 30;
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
        }
    });

    showQuestion(currentQuestion);
});
