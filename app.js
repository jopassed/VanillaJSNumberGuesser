'use strict';

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

//UI Elements
const UIgame = document.getElementById('game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');


//Assign UI min and max numbers
UIminNum.textContent = min;
UImaxNum.textContent = max;


//Play again event listener 
UIgame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//listen for guess

UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if won
    if(guess === winningNum){
    
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
        
    } else {
        //wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //game over - lost

            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            //disable input

        } else {
            //game continues - answer wrong

             //change border color
            UIguessInput.style.borderColor = 'red';

            //clear input
            UIguessInput.value = '';

            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }

    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input
    UIguessInput.disabled = true;
    //change border color
    UIguessInput.style.borderColor = color;
    //set message
    setMessage(msg, color); // brad forgot about his param in the tutorial :(

    //play again?
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
}

//get winning number - functions are hoisted so it bumps up to the top.
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color){
    UImessage.textContent = msg;
    UImessage.style.color = color;
}