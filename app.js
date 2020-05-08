'use strict';

//variables
let randomNumber = Math.floor(Math.random() * (9 + 1) + 1);
const form = document.querySelector("#form-input");
const pMsg = document.createElement('p');
pMsg.className = 'gameMsg';
pMsg.style.color = 'red';
let numberOfGuesses = 0;
const guess = document.querySelector('.guess-input');
const maxGuesses = 3;
console.log(randomNumber);

form.addEventListener('submit', checkGuess);

function resetGame(){
    randomNumber = Math.floor(Math.random() * (9 + 1) + 1);
    console.log(randomNumber);
    numberOfGuesses = 0;
    guess.value = '';
    document.querySelector('.gameMsg').remove();
    pMsg.style.color = 'red';
}

function checkGuess(e){
    e.preventDefault();
    let guessNumber = parseInt(guess.value);
    if (guessNumber && numberOfGuesses < maxGuesses) {
        numberOfGuesses++;
        if (guessNumber === randomNumber && numberOfGuesses <= maxGuesses){
            pMsg.style.color = 'green';
            pMsg.innerText = `Your guess of: ${guess.value} is Correct! Congrats!`;
            form.after(pMsg);
            setTimeout(resetGame, 2000);
        } else if (numberOfGuesses < maxGuesses) {
            pMsg.innerText = `Your guess of ${guess.value} is WRONG. You only have:  ${(maxGuesses - numberOfGuesses)} guesses left!`;
            form.after(pMsg); 
            guess.value = '';
        } else if (numberOfGuesses === maxGuesses ) {
            pMsg.innerText = `You are out of guesses! The number was ${randomNumber}. Try again with a new number!`;
            form.after(pMsg);
            setTimeout(resetGame, 2000); 
        }   
    } else {
        pMsg.innerText = 'Please Enter a Guess!';
        form.after(pMsg);
    }

}
