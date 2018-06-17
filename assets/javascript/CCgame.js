var randomNum;
var score = 0;
var valueToAdd;
var wins = 0;
var losses = 0;

function randomNumberGen(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function reset(){
    score = 0;
    $('#score').html(score);
    randomNum = 0;
    randomNum = randomNumberGen(19, 120);
    $('#randomNum').html(randomNum);
    $('#but1').attr('value', randomNumberGen(1, 12));
    $('#but2').attr('value', randomNumberGen(1, 12));
    $('#but3').attr('value', randomNumberGen(1, 12));
    $('#but4').attr('value', randomNumberGen(1, 12));
}
randomNum = randomNumberGen(19, 120);
$('#randomNum').html(randomNum);
$('#but1').attr('value', randomNumberGen(1, 12));
$('#but2').attr('value', randomNumberGen(1, 12));
$('#but3').attr('value', randomNumberGen(1, 12));
$('#but4').attr('value', randomNumberGen(1, 12));

$('button').click(function() {
    valueToAdd = parseInt($(this).attr('value'));
    score += valueToAdd;
    $('#score').html(score);

    if (score === randomNum){
        $('#winLossText').html('You won!');
        wins++;
        $('#wins').html(wins);
        reset();
    }
    else if (score > randomNum){
        $('#winLossText').empty();
        $('#winLossText').html("You lost!");
        losses++;
        $('#losses').html(losses);
        reset();
    }
});


