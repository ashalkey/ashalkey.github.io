var numWins = 0;
var numLosses = 0;
var numGuesses = 10;
var lettersGuessed = [""];
var maFilms = ["Enter The Dragon", "Police Story", "The Legend of Drunken Master", 
"Crouching Tiger Hidden Dragon", "Fist of Legend", "The Protector", "Ip Man",
"Five Deadly Venoms", "The 36th Chamber of Shaolin", "Once Upon a Time in China",
"Master of the Flying Guillotine", "Shogun Assassin", "Wheels on Meals", "Fist of Fury",
"Rumble in the Bronx", "The 36th Chamber of Shaolin", "The Eight Diagram Pole Fighter"];
// var maFilms = ["Enter The Dragon", "Police Story"];
var currentFilm = maFilms[Math.floor(Math.random()*maFilms.length)].toLowerCase();
var currentAnswer = [""];
var youWon = false;
var textRemoved = false;
var answeredFilms = [''];

function parseFilm() {

    for (var i = 0; i < currentFilm.length; i++) {

        if (currentFilm.charAt(i) === " ") {
            currentAnswer[i] = " ";
        }
        else {
            currentAnswer[i] = "_";
        }
    }

    document.getElementById('maFilm').innerHTML = currentAnswer.join("");
}

parseFilm();

document.onkeyup = function (event) {
    if(!youWon){
    if (!textRemoved) {
        document.getElementById('introText').remove();
        textRemoved = true;
    }
    var letterPressed = event.key;
    var idxLetterPressed = currentFilm.indexOf(letterPressed);

    while (idxLetterPressed != -1) {
        currentAnswer[idxLetterPressed] = letterPressed;
        document.getElementById('maFilm').innerHTML = currentAnswer.join("");

        idxLetterPressed = currentFilm.indexOf(letterPressed, idxLetterPressed + 1);

        if (currentAnswer.join("") === currentFilm) {
            youWon = true;
            numWins++;
            document.getElementById('wins').innerHTML = numWins;
            var audio = document.getElementById('audio');
            audio.play();
            document.getElementById('winText').innerHTML = "That is CORRECT! <br> Press enter to play again";
            if (answeredFilms[0] === ""){
            answeredFilms[0] = currentFilm;
            }
            else {
                answeredFilms.push(currentFilm);
            }
            document.getElementById('answeredFilms').innerHTML = answeredFilms.join(", ");
        }
    }

    if (!currentFilm.includes(letterPressed) && !lettersGuessed.includes(letterPressed)) {
        numGuesses--;
        document.getElementById('guesses').innerHTML = numGuesses;
        lettersGuessed.push(letterPressed);
        document.getElementById('lettersGuessed').innerHTML = lettersGuessed.join(" ");
    }
}
    if (event.key === "Enter" && youWon === true) {
        reset();
    }

    if (numGuesses === 0) {
        alert("You lost! Resetting the game");
        numLosses++;
        document.getElementById('losses').innerHTML = numLosses;
        reset();
    }

}

function chooseFilm() {

    currentFilm = maFilms[Math.floor(Math.random() * maFilms.length)].toLowerCase();

    while (answeredFilms.includes(currentFilm)) {

        if (answeredFilms.length === maFilms.length) {
            document.getElementById('gotEmAll').innerHTML = "You've guessed all of the films correctly! Congratulations!";
            break;
        }
        else {
        currentFilm = maFilms[Math.floor(Math.random() * maFilms.length)].toLowerCase();
        }
    }
}

function reset() {
    youWon = false;
    document.getElementById('winText').innerHTML = "";
    numGuesses = 10;
    document.getElementById('guesses').innerHTML = numGuesses;
    chooseFilm();
    currentAnswer = [""];
    lettersGuessed = [""];
    document.getElementById('lettersGuessed').innerHTML = lettersGuessed;
    parseFilm();
}



