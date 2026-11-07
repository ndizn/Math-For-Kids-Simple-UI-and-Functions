//State
let currentOp = '+';
let activeOpSymbol = '+';
let num1 = 2;
let num2 = 2;
let correctAnswer = 4;

const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const opSymbolEl = document.getElementById('op-symbol');
const answerInput = document.getElementById('answerInput');
const feedbackEl = document.getElementById('feedback');
const explanationEl = document.getElementById('explanation');
//random button
const opButtons = document.querySelectorAll('.op-btn');

//Sidebar random
opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        opButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // spin animation
        btn.classList.remove('spin');
        void btn.offsetWidth; // restart animation
        btn.classList.add('spin');
        btn.addEventListener('animationend', () => btn.classList.remove('spin'), { once: true });

        currentOp = btn.dataset.op;
        generateProblem();
    });
});
opButtons[0].classList.add('selected');

//Helpers 
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Event listeners
document.getElementById('generateBtn').addEventListener('click', generateProblem);

function generateProblem() {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    explanationEl.className = 'explanation';
    explanationEl.textContent = '';
    answerInput.value = '';

    let activeOp = currentOp;
    if (currentOp === 'random') {
        const ops = ['+', '-', '×', '÷'];
        activeOp = ops[randInt(0, ops.length - 1)];
    }

    if (activeOp === '+') {
        num1 = randInt(0, 10);
        num2 = randInt(0, 10);
        correctAnswer = num1 + num2;
    } else if (activeOp === '-') {
        num1 = randInt(0, 10);
        num2 = randInt(0, 10);
        if (num2 > num1) { const t = num1; num1 = num2; num2 = t; }
        correctAnswer = num1 - num2;
    } else if (activeOp === '×') {
        num1 = randInt(0, 10);
        num2 = randInt(0, 10);
        correctAnswer = num1 * num2;
    } else if (activeOp === '÷') {
        num2 = randInt(1, 10);
        correctAnswer = randInt(0, 10);
        num1 = num2 * correctAnswer;
    }

    num1El.textContent = num1;
    num2El.textContent = num2;
    opSymbolEl.textContent = activeOp;
    activeOpSymbol = activeOp;

    answerInput.focus();
}
//explanation
function buildExplanation() {
    switch (activeOpSymbol) {
        case '+':
            return `Because ${num1} + ${num2} = ${correctAnswer}. Try counting ${num2} more starting from ${num1}!`;
        case '-':
            return `Because ${num1} - ${num2} = ${correctAnswer}. Start at ${num1} and count back ${num2}!`;
        case '×':
            return `Because ${num1} × ${num2} means adding ${num1} to itself ${num2} times, which equals ${correctAnswer}!`;
        case '÷':
            return `Because ${num1} ÷ ${num2} asks how many groups of ${num2} fit into ${num1}, and that's ${correctAnswer} groups!`;
        default:
            return '';
    }
}

function checkAnswer() {
    const raw = answerInput.value.trim();
    if (raw === '') return;

    const userAnswer = parseFloat(raw);
    explanationEl.textContent = buildExplanation();
    explanationEl.classList.add('show');

    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'feedback correct';
        playCorrectSound();
    } else {
        feedbackEl.textContent = 'Wrong, try again.';
        feedbackEl.className = 'feedback wrong';
        playWrongSound();
    }
}

//Sound effects 
function playCorrectSound() {
    const sound = new Audio('cr.mp3');
    sound.play();
}

function playWrongSound() {
    const sound = new Audio('nope.mp3');
    sound.play();
}
//event listner
document.getElementById('checkBtn').addEventListener('click', checkAnswer);

answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
});


answerInput.addEventListener('input', () => {
    answerInput.value = answerInput.value.replace(/[^0-9]/g, '');
});

//Init
generateProblem();