let data = [];
let firstButton = false;
let secondButton = false;
let score = 0;
let mistakes = 0;
let timer;

fetch('https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json')
    .then(response => response.json())
    .then(jsonResponse => data = jsonResponse);

function start() {
    timer = setInterval(setTime, 1000);
    startQuiz();
}

function startQuiz() {
    document.querySelector('.container__btn').style.display = 'none';

    if (data.length === 0) {
        document.querySelector('.container-result__score').innerHTML = score;
        document.querySelector('.container-result__mistakes').innerHTML = mistakes;
        document.querySelector('.container-result').style.display = 'block';
        document.querySelector('.container-deck').style.display = 'none';
        clearInterval(timer);
    } else {
        document.querySelector('.container-deck').style.display = 'block';
        document.querySelector('.container-deck__question').innerHTML = data[0].question;
        document.querySelector('.container-deck__btn--one').innerHTML = data[0].answers[0].answer;
        if (data[0].answers[0].correct === true) {
            firstButton = true;
        }
        document.querySelector('.container-deck__btn--two').innerHTML = data[0].answers[1].answer;
        if (data[0].answers[1].correct === true) {
            secondButton = true;
        }
    }
}

function selectAnswer(answer) {
    if (answer === true) {
        score += 1;
    } else {
        data.push(data[0]);
        mistakes += 1;
    }
    data.splice(0, 1);
    firstButton = false;
    secondButton = false;
    startQuiz();
}

document.querySelector('.container__btn').addEventListener('click', start);

/* Timer */

let totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    document.querySelector(".container-result__seconds").innerHTML = pad(totalSeconds % 60);
    document.querySelector(".container-result__minutes").innerHTML = pad(parseInt(totalSeconds / 60));
};

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}