var gamePattern = [];
const buttomColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var Level = 0;
function nextSequence() {
    var random =  Math.floor(Math.random() * 4);
    
    var randomColor = buttomColor[random];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    markSequence(gamePattern);
    Level++;
    $("h1").text("Level " + Level);
}

   var index = 0;
$(".btn").click(function () {
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(index);
   
   
})
function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    },200)
}

var gameStarted = false;
var gameLost = false;
$("body").keypress((event) => { 
    if (event.key === "a") {
        if (gameStarted===false) {
            gameStarted = true;
            nextSequence();
        }
    }
    if (gameLost === true) {
        gameLost = false;
        startOver();
    }
   
})
function checkAnswer(currentIndex) {
  
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex] ) {
        console.log("success");
        index+=1;
        if ((gamePattern.length-1) === currentIndex ) {
            reset();
            setTimeout(() => { nextSequence() }, 1000);
            
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        },200)
        var gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();
        $("h1").html("GameOver at Level " + Level + "</br> Press any button to restart");
        gameLost = true;
    }
    
}
function reset() {
    index = 0;
    userClickedPattern = [];
}
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    Level = 0;
    index = 0;
    nextSequence();
}
function markSequence(x) {
        for (let i = 0; i < x.length; i++){
       
        setTimeout(() => {  var c = $("#" + x[i])
        c.fadeOut(100).fadeIn(100);
        $("#" + x[i]).on(playSound(x[i]));}, (i+1)*1000);
    }
}