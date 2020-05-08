'use strict';

//variables
let min = 1,
    max = 10,
    numberOfTries = 3,   
    winningNumber = randomNumber(min, max);
 
//set min and max to UI
document.querySelector('.min-num').innerText = min;
document.querySelector('.max-num').innerText = max;

//UI Variables
const UImessage = document.querySelector('.message'),
    UIinputBtn = document.querySelector('#guess-btn'),
    UIinput = document.querySelector('#guess-input'),
    UIgame = document.querySelector('#game');

//Event Listeners    
UIinputBtn.addEventListener('click', checkGuess);
UIinput.addEventListener('submit', checkGuess);
UIgame.addEventListener('mousedown', function(e){
    if (e.target.className === 'play-again'){
        window.location.reload();
    }
});

function gameOver(won, msg){
let color;
won === true ? color = 'green' : color = 'red';
UIinput.disabled = true;
setMessage(msg, color);
UIinputBtn.value = 'Play Again';
UIinputBtn.className = 'play-again';    
}

function setMessage(msg, color) {
    UIinput.style.borderColor = color;
    UImessage.style.color = color;
    UImessage.textContent = msg;
    setTimeout(resetUI, 5000);
}

function resetUI(){
    UIinput.style.borderColor = '#D1D1D1';
    UImessage.textContent = '';
    UIinput.value = '';
}

function checkGuess(e){
    e.preventDefault();
    let guessNumber = parseInt(UIinput.value);
    if (isNaN(guessNumber) || guessNumber < min || guessNumber > max) {
        setMessage(`Please Pick a number between ${min} and ${max}.`, 'red');
         } else {
        if (guessNumber === winningNumber) {
            gameOver(true, `You picked ${winningNumber} and you are correct!`);
        } else {
        numberOfTries -= 1;
            if (numberOfTries === 0){
                gameOver(false, `You didn't guess the right number. The number was ${winningNumber}. Sorry bucko!`);
            } else {
                UIinput.value = '';
                setMessage(`Your pick up ${guessNumber} is INCORRECT. You have ${numberOfTries} tries left.`, 'red');
            }
        }
    }
}
//random number function
function randomNumber(min, max){
return Math.floor(Math.random() * (max - min + 1) + min);
}