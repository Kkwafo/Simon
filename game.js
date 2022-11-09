
// 1 -  creo una matriz que tiene los 4 colores
var buttonColours = ["red", "blue", "green", "yellow"];
// 2 - matriz donde tendran los datos de la secuencia random. que la va a genara un numero random
var gamePattern = [];
// 3 - creo una matriz donde va a tener los datos de la secuencia del jugador
var userClickedPattern = [];
// 4 - tengo una variable start que es igual a falso
var started = false;
// tengo una variable que empieza de cero
var level = 0;
// selecciono todo el documento y le pongo un listener teclas que alerta la funcion
//si alguien persiona una tecla la funcion dice que si la variable started es falsa
//seleciona el ID del H1 y le cambia el texto a "Level + mas la variable "level" luego
//llama a la funcion nextSequence y cambia a started = true
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//seleciono todos los botones y le pongo un listener de click que llama a una uncion anonima
//que genera una variable que igual al que boton fue presionado, $(this) y "get" busca el atributo ("id") es decir busca
// el boton a ese boton lo incorpora en la matriz userChosenColour. Luego llama la funcion playSound y animatePress
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(level) {
      if (gamePattern[level] === userClickedPattern[level]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      console.log("wrong");
      playSound("wrong");
      gameOver();
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
//funcion nextSequence incrementa el nivel en 1 luego cambia el texto h1 con ID level-tittle al valor de la variable nivel
//genera un valor random y lo coloca en la matriz gamePattern
//luego busca el id con el nombre de randomchoosecolor y le agrega un efecto flash
//luego genera el sonido
function nextSequence() {
userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//funcion playSound tiene una variable digamos X (name) donde sera remplazada donde quiera usarla.
// entnces genera una variable que crea un audio que esta ubicado en directorio + esa variable X dentro del nombre .mp3
//como esta en otra carpeta lo hago asi
//luego la llamo diciendo audio.play(); y ejcuta el sonido
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// funcion anomatePress lo agrega la class de press al boton y luego tiene otra funcion seteada en 1 seg que le remuve la class
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
//
