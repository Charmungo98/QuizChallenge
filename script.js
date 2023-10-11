document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question');
    const timers = document.querySelectorAll('.timer span');
    const restartButton = document.getElementById('restart');

    let currentQuestion = 0;

    timers[currentQuestion].textContent = 30;
    showQuestion(currentQuestion);

