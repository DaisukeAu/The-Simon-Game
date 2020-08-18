var level = 1;
var pattern = [];
var canUserClick = false;
var userClickIndex = 0;
var didGameStart = false;


$(document).keydown(function() {
  if (didGameStart === false) {
    generatePattern();
    $(".title").text("Level " + level);
    didGameStart = true;
  }
})


$(".tile").click(function() { //detecting tile clicks
  if (canUserClick) { //checking if the user is allowed to click
    $(this).addClass("user-clicked");
    var elem = $(this);



    setTimeout((function(elem) {
      return function() {
        elem.removeClass("user-clicked");
      }
    })(elem), 100);




    if ($(this).attr('id') == pattern[userClickIndex]) { //user is correct

      getSound(parseInt($(this).attr('id'))).play();

      if (userClickIndex === (level - 1)) { //clicked last tile
        canUserClick = false;
        userClickIndex = 0;
        level++;
        $(".title").text("Level " + level);

        setTimeout(function() {
          generatePattern();
        }, (1000));



      } else { //not last tile
        userClickIndex++;
      }

    } else { //user is incorrect
      level = 1; //resetting level
      canUserClick = false;
      userClickIndex = 0;
      didGameStart = false;
      new Audio("sounds/wrong.mp3").play();

      $(".title").text("Press Any Key To Start");


      $("body").css("background-color", "red");
      setTimeout(function() {
        $("body").css("background-color", "#0a2041");
      }, (500));
    }

  }
});

function generatePattern() {
  pattern = []; //resetting pattern
  var tileIndex = 0; //the current tile that the animation just finished on
  for (var i = 0; i < level; i++) {
    setTimeout(function() {
      var num = Math.floor(Math.random() * 4) + 1;
      pattern.push(num);
      $("#" + num).addClass("computer-clicked");



      getSound(num).play();


      setTimeout(function() {
        $("#" + num).removeClass("computer-clicked");
        tileIndex++;
        if (tileIndex === level) {
          canUserClick = true;
        }
      }, (300));

    }, i * 500);

  }
}

function getSound(num){
  var music;
  console.log(num);
  switch (num) {
    case 1:
      music = new Audio("sounds/green.mp3");
      break;
    case 2:
      music = new Audio("sounds/red.mp3");
      break;
    case 3:
      music = new Audio("sounds/yellow.mp3");
      break;
    default:
      music = new Audio("sounds/blue.mp3");
  }
  console.log(music);
  return music;
}
