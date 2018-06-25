var correctAnswers = 0;
var wrongAnswers = 0;
var triviaQuestions = [
    questionOne = {
        question: 'You can trace the origins of this martial art back to Russia',
        answers: ['Sambo', 'Karakucak', 'Hapkido', 'Judo'],
        cAnswer: 'Sambo',
        gif: 'assets/images/Sambo.gif',
        alt: 'Sambo gif'
    },

    questionTwo = {
        question: 'This martial art focuses on striking and employs the use of knees and elbows. Tony Jaa and Saenchai are famous practitioners.',
        answers: ['Vovinam', 'Karate', 'Wushu', 'Muay Thai'],
        cAnswer: 'Muay Thai',
        gif: 'assets/images/Muay-Thai.gif',
        alt: 'Muay Thai'
    },
    questionThree = {
        question: 'This martial art focuses on grappling and has origins in Japan.  It was popularized by the Gracie family.',
        answers: ['Hwa Rang Do', 'Sumo', 'Brazilian Jiu-Jitsu', 'Wrestling'],
        cAnswer: 'Brazilian Jiu-Jitsu',
        gif: 'assets/images/Brazilian-Jiu-Jitsu.gif',
        alt: 'Brazilian Jiu-Jitsu Omoplata'
    },
    questionFour = {
        question: 'With origins in China, this martial art was practiced by the stars of Enter the Dragon and Ip Man.',
        answers: ['Aikido', 'Wing Chun', 'Tang Soo Do', 'Jeet Kune Do'],
        cAnswer: 'Wing Chun',
        gif: 'assets/images/Wing-Chun.gif',
        alt: 'Wing-Chun'
    },
    questionFive = {
        question: 'The most popular martial art in Korea is known for its kicking techniques.  Joe Rogan is a famous American practitioner.',
        answers: ['Kendo', 'Taekwondo', 'Tai Chi', 'Baguazhang'],
        cAnswer: 'Taekwondo',
        gif: 'assets/images/Taekwando.gif',
        alt: 'Taekwando Knockout'
    },
    questionSix = {
        question: 'This martial art has origins in Isreal and was derived from a combination boxing, wrestling, aikido, judo, and karate.',
        answers: [ 'Lethwei', 'GongKwon Yusul', 'Kuntao', 'Krav Maga'],
        cAnswer: 'Krav Maga',
        gif: 'assets/images/Krav-Maga.gif',
        alt: 'Krav Maga Disarm'
    }
];

var questionNum = 1;
var intervalId;
var tenIntervalId;
var timesUp = false;
var answered = false;

var gifContainer = $('<div>').addClass('col-md-6 offset-md-3 gif-container');

var timer = {
    time: 30,
    count: function () {
        timer.time--;
        $('#timer').text('Time remaining: ' + timer.time);
        if (timer.time === 0) {
            outOfTime();
        }

    },
    start: function () {
        intervalId = setInterval(timer.count, 1000);
    },
    reset: function () {
        clearInterval(intervalId);
        timer.time = 30;
        $('#timer').text('Time remaining: ' + timer.time);
    },
    countdownTen: function () {
        tenIntervalId = setTimeout(timeOutNextQuestion, 10000);
    },
    countdownTenClear: function(){
        clearTimeout(tenIntervalId);
    }
};

$('#start-button').click(function () {
    $(this).remove();
    startGame();
});

function startGame() {
    $('.img-fluid').remove();
    $('.display-4').text('Question #' + questionNum);
    timer.reset();
    $('#timer').text('Time remaining: ' + timer.time);
    timer.start();
    var tQuestionContainer = $('<div>').addClass('col-md-6 offset-md-3 question-text');
    var tQuestionText = $('<p>');
    tQuestionText.attr('id', 'p-question-text');
    tQuestionText.text(triviaQuestions[0].question);
    tQuestionText.prependTo(tQuestionContainer);
    tQuestionContainer.appendTo('.question-container');
    $('.centered-buttons').removeClass('centered-buttons').addClass('btn-group-vertical');
    createAnswerButtons();
}

function createAnswerButtons() {
    for (var i = 0; i < 4; i++) {
        var answerButton = $('<button>').addClass('btn btn-warning btn-lg answer');
        answerButton.text(triviaQuestions[questionNum - 1].answers[i]);
        if (triviaQuestions[questionNum - 1].cAnswer.indexOf(answerButton.text()) >= 0) {
            answerButton.attr('id', 'cAnswer');
        }
        else {
            answerButton.addClass('wAnswer');
        }
        answerButton.appendTo('.btn-group-vertical');
    }
    $('#cAnswer').click(clickedCorrectAnswer);
    $('.wAnswer').click(clickedWrongAnswer);
}

function nextQuestion() {
    $(this).remove();
    $('.img-fluid').remove();
    timer.countdownTenClear();
    if (questionNum === triviaQuestions.length) {
        showResults();
    }
    else {
        questionNum++;
        $('.display-4').text('Question #' + questionNum);
        $('#p-question-text').text(triviaQuestions[questionNum - 1].question);
        createAnswerButtons();
        timer.reset();
        $('#timer').text('Time remaining: ' + timer.time);
        timer.start();
    }
}

function timeOutNextQuestion() {
    $('.next-question').remove()
    $('.img-fluid').remove();
    timer.countdownTenClear();
    if (questionNum === triviaQuestions.length) {
        showResults();
    }
    else {
        questionNum++;
        $('.display-4').text('Question #' + questionNum);
        $('#p-question-text').text(triviaQuestions[questionNum - 1].question);
        createAnswerButtons();
        timer.reset();
        $('#timer').text('Time remaining: ' + timer.time);
        timer.start();
    }
}

function outOfTime() {
    wrongAnswers++;
    timer.reset();
    $('#timer').empty();
    $('.answer').remove();
    $('#p-question-text').text('You are out of time! The correct answer is ' + triviaQuestions[questionNum - 1].cAnswer);
    attachGif();
    createNextQuestionButton();
    timer.countdownTen();
}

function clickedCorrectAnswer() {
    correctAnswers++;
    timer.reset();
    timer.countdownTenClear();
    $('#timer').empty();
    $('.answer').remove();
    $('#p-question-text').text(triviaQuestions[questionNum - 1].cAnswer + " is correct!");
    attachGif();
    createNextQuestionButton();
    timer.countdownTen();
}

function clickedWrongAnswer() {
    wrongAnswers++;
    timer.reset();
    timer.countdownTenClear();
    $('#timer').empty();
    var answerText = $(this).text();
    $('.answer').remove();
    $('#p-question-text').text(answerText + " is incorrect! The correct answer was " + triviaQuestions[questionNum - 1].cAnswer);
    attachGif();
    createNextQuestionButton();
    timer.countdownTen();
}

function showResults() {
    $('.display-4').text('Results');
    $('#p-question-text').remove();
    var winHeader = $('<div>').addClass('col-md-6 offset-md-3 results').text('Number of correct answers: ' + correctAnswers);
    var loseHeader = $('<div>').addClass('col-md-6 offset-md-3 results').text('Number of incorrect answers: ' + wrongAnswers);
    winHeader.appendTo('.question-container');
    loseHeader.appendTo('.result-container');
    var resetButton = $('<button>').addClass('btn btn-primary btn-lg reset').text('Click to play again!');
    resetButton.appendTo('.btn-group-vertical');
    $('.reset').click(window.resetGame);
}

function createNextQuestionButton() {
    var nextQuestion = $('<button>').addClass('btn btn-success btn-lg next-question').text('Next Question');
    nextQuestion.appendTo('.btn-group-vertical');
    $('.next-question').click(window.nextQuestion);
}

function attachGif() {
    var gif = $('<img>').attr({
        'class': 'img-fluid mx-auto',
        'src': triviaQuestions[questionNum -1].gif,
        'alt': triviaQuestions[questionNum -1].alt
    })
    gifContainer.appendTo('.result-container');
    gif.appendTo('.gif-container');
}
function resetGame() {
    $(this).remove();
    $('.results').remove();
    questionNum = 1;
    correctAnswers = 0;
    wrongAnswers = 0;
    startGame();
}
