let lives = 3;
let score = 0;
let currentQuestion = {};
let isGameRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
    document.getElementById('answer').addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    document.getElementById('tutorial-btn').addEventListener('click', showTutorial);
    document.getElementById('close-tutorial').addEventListener('click', closeTutorial);
});

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    lives = 3;
    score = 0;
    updateGameInfo();
    generateQuestion();
    document.getElementById('game-over').style.display = 'none';
    document.body.classList.remove('game-over');
}

function updateGameInfo() {
    document.getElementById('lives').innerText = `❤️ ${lives}`;
    document.getElementById('score').innerText = `Pontuação: ${score}`;
}

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question;
    let answer;

    if (operation === '/') {
        question = `${num1 * num2} / ${num1}`;
        answer = num2;
    } else {
        question = `${num1} ${operation} ${num2}`;
        answer = eval(question);
    }

    currentQuestion = {
        question: question,
        answer: answer
    };

    const questionText = document.getElementById('question');
    
    questionText.style.opacity = 0;
    setTimeout(() => {
        questionText.innerText = `Qual é ${question}?`;
        questionText.style.opacity = 1;
    }, 500);
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const answerInput = document.getElementById('answer');

    if (userAnswer === currentQuestion.answer) {
        score += 10;
        generateQuestion();
    } else {
        answerInput.classList.add('shake');
        setTimeout(() => answerInput.classList.remove('shake'), 500);
        lives -= 1;
        if (lives <= 0) {
            document.getElementById('final-score').innerText = `Sua pontuação final é: ${score}`;
            document.getElementById('game-over').style.display = 'flex';
            document.body.classList.add('game-over');
            isGameRunning = false;
        }
    }

    updateGameInfo();
    document.getElementById('answer').value = '';
}

function restartGame() {
    startGame();
}

function showTutorial() {
    document.getElementById('tutorial').style.display = 'flex';
}

function closeTutorial() {
    document.getElementById('tutorial').style.display = 'none';
}
