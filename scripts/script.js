const firstRollButton = document.querySelector('.increment-first-score');
const secondRollButton = document.querySelector('.increment-second-score');
const resetScoreButton = document.querySelector('.reset-button');
const lockFirstScoreButton = document.querySelector('.lock-first-score');
const lockSecondScoreButton = document.querySelector('.lock-second-score');
const newGameButton = document.querySelector('.new-game-button');
const clearAllData = document.querySelector('.clear-data');

const firstScore = document.querySelector('.first-score');
const secondScore = document.querySelector('.second-score');
const rollToastMessageTitle = document.querySelector('.rolled-title');

const scoreTable = document.querySelector('.table');

firstScore.innerHTML = 0;
secondScore.innerHTML = 0;

let firstScoreValue = 0;
let secondScoreValue = 0;

let gameCounter = 1;

let firstScoreId = 1;
let secondScoreId = 1;
let winnerScoreId = 1;

let bothButtonsLocked = 0;
let firstPlayerPlayed = false;

firstRollButton.addEventListener('click', function(e){
    e.preventDefault();
    let randomValue = Math.floor(Math.random() * 6) + 1;
    firstScoreValue += randomValue;
    firstScore.innerHTML = firstScoreValue;

    if(randomValue == 1){
        resetFirstData();
        rollToastMessageTitle.innerHTML = 'You got toed!';
        firstScoreValue = 0;
        firstRollButton.disabled = true;
    }
    else {
        rollToastMessageTitle.innerHTML = 'You rolled ' + randomValue.toString() + '!';
    }   
    randomValue = 0;
    firstPlayerPlayed = true;
})

secondRollButton.addEventListener('click', function(e){
    e.preventDefault();

    if(firstPlayerPlayed == true){
        let randomValue = Math.floor(Math.random() * 6) + 1;
        secondScoreValue += randomValue;
        secondScore.innerHTML = secondScoreValue;

        if(randomValue == 1){
            resetSecondData();
            rollToastMessageTitle.innerHTML = 'You got toed!'
            secondScoreValue = 0;
            secondRollButton.disabled = true;
        }
        else {
            rollToastMessageTitle.innerHTML = 'You rolled ' + randomValue.toString() + '!';
        }
        randomValue = 0;
    }
    else {
        rollToastMessageTitle.innerHTML = 'Wait for your turn!';
    }
})

resetScoreButton.addEventListener('click', function(e){
    e.preventDefault();
    resetData();
})

lockFirstScoreButton.addEventListener('click', function(e){
    e.preventDefault();

    const tdElement = document.createElement('td');
    const tableRow = document.querySelector('.row' + firstScoreId);
    tdElement.innerHTML = firstScoreValue;
    tableRow.append(tdElement);

    if(firstScoreValue == 0 && firstRollButton.disabled == false){
        rollToastMessageTitle.innerHTML = 'Please roll first!';
    }
    else {
        firstRollButton.disabled = true;
        rollToastMessageTitle.innerHTML = 'Playing: Second player!';
    }

    firstScoreId++;
    bothButtonsLocked++;
})

lockSecondScoreButton.addEventListener('click', function(e){
    e.preventDefault();

    const tdElement = document.createElement('td');
    const tableRow = document.querySelector('.row' + secondScoreId);
    tdElement.innerHTML = secondScoreValue;
    tableRow.append(tdElement);

    if(firstScoreValue == 0){
        rollToastMessageTitle.innerHTML = 'Please roll first!';
    }
    else {
        secondRollButton.disabled = true;
        rollToastMessageTitle.innerHTML = 'You locked your score!';
    }

    secondScoreId++;
    bothButtonsLocked++;

    winnerHandler();
})

newGameButton.addEventListener('click', function(e){
    e.preventDefault();

    rollToastMessageTitle.innerHTML = 'Playing: First player!' 

    const tBodyElement = document.querySelector('.table-body');

    const trElement = document.createElement('tr');
    trElement.classList.add('row' + gameCounter);
    tBodyElement.appendChild(trElement);

    const thElement = document.createElement('th');
    thElement.innerHTML = '#' + gameCounter;
    trElement.append(thElement);

    gameCounter++;
})

clearAllData.addEventListener('click', function(e){
    window.location.reload();
})

function resetFirstData(){
    firstScore.innerHTML = 0;
    firstScoreValue = 0;
    firstRollButton.disabled = false;
}

function resetSecondData(){
    secondScore.innerHTML = 0;
    secondScoreValue = 0;
    secondRollButton.disabled = false;
}

function resetData(){
    resetFirstData();
    resetSecondData();
    rollToastMessageTitle.innerHTML = 'Start a new game!';
}

function winnerHandler(){
    if(firstScoreValue > secondScoreValue){
        const winnerElement = document.createElement('td');
        const tableRow = document.querySelector('.row' + winnerScoreId);
        winnerElement.style.fontWeight = 'bold';
        const message = "First player"; 
        winnerElement.innerText = message;
        tableRow.append(winnerElement);
    }
    if(firstScoreValue == secondScoreValue){
        const winnerElement = document.createElement('td');
        const tableRow = document.querySelector('.row' + winnerScoreId);
        winnerElement.style.fontWeight = 'bold';
        const message = "We'll get 'em next time!";
        winnerElement.innerText = message;
        tableRow.append(winnerElement);
    }
    if(firstScoreValue < secondScoreValue){
        const winnerElement = document.createElement('td');
        const tableRow = document.querySelector('.row' + winnerScoreId);
        winnerElement.style.fontWeight = 'bold';
        const message = "Second player"; 
        winnerElement.innerText = message;
        tableRow.append(winnerElement);
    }
    winnerScoreId++;
    rollToastMessageTitle.innerText = 'Game over!';
}