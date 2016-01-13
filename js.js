$(document).ready(function(){

// generates random number from 1-4
  function generateNumber() {
    var a = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    return a
  }

  var audio1 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var audio2 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var audio3 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var audio4 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// remove overlay function
  function removeOverlay(smth) {
    $(smth).removeClass('opacity-1');
  }

// add number of the button to userInput
  var userInput = [];
  $('.one').click(function(){
    userInput.push(1);
    audio1.play();
  });

  $('.two').click(function(){
    userInput.push(2)
    audio2.play();
  })

  $('.three').click(function(){
    userInput.push(3)
    audio3.play();
  })

  $('.four').click(function(){
    userInput.push(4)
    audio4.play();
  })
  // end of button clicks

 // on switch click move slider
  $('.switch').click(function() {
    if ($('.slider').hasClass('right')) {
      $('.slider').removeClass('right');
      $('.slider').text('Normal');
    } else {
      $('.slider').addClass('right');
      $('.slider').text('Strict');
    }
  });

// function for showing lights
  function lights(number) {
    switch (number) {
      case 1:
        audio1.play();
        $('#one').addClass('opacity-1');
        window.setTimeout(function() {removeOverlay('#one')}, delay);
        break;
      case 2:
        audio2.play();
        $('#two').addClass('opacity-1');
        window.setTimeout(function() {removeOverlay('#two')}, delay);
        break;
      case 3:
        audio3.play();
        $('#three').addClass('opacity-1');
        window.setTimeout(function() {removeOverlay('#three')}, delay);
        break;
      case 4:
        audio4.play();
        $('#four').addClass('opacity-1');
        window.setTimeout(function() {removeOverlay('#four')}, delay);
        break;
      default:
        break;
    }
  }

  // delays
  var delay = 500;
  var delays = [1250, 1000, 750, 500];
  // I = number of rounds

// counter of loops
  var I = 1;
// MAIN LOOP:
  var generatedNumbers = [];
  function mainLoop() {
    // update counter
    $('.counter').text(I);

    // increase speed based on I
    if (I < 6) {
      delay1 = delays[0];
    } else if (I < 10) {
      delay1 = delays[1];
    } else if (I < 14) {
      delay1 = delays[2];
    } else if (I < 16) {
      delay = 250;
      delay1 = delays[3];
    } else if (I > 20) {
      window.alert('You have won the game');
      I = 0;
      i = 0;
      userInput = [];
      generatedNumbers = [];
    }

  // generate random number
    number = generateNumber();
    generatedNumbers.push(number);

// function for showing lights in order
  var i = 0;
    function showButton() {
      var button = generatedNumbers[i];
      lights(button);
      i++;
      if (i == generatedNumbers.length ) {
        window.clearInterval(interval);
        $('.background').removeClass('disabled');
    }
  }

  // light buttons with delay1
    interval = window.setInterval(showButton, delay1);

    // wait for user input
      $('.background').click(function() {
            if (userInput.length === generatedNumbers.length && userInput[userInput.length - 1] === generatedNumbers[generatedNumbers.length-1]) {
              userInput = [];
              I++;
              mainLoop();
              $('.background').addClass('disabled');
            } else {
              // if strict mode is on:
              if ($('.slider').hasClass('right')) {
                for (j = 0; j < userInput.length; j++) {
                  if (userInput[j] !== generatedNumbers[j]){
                    $('.counter').text('Wrong!');
                    userInput = [];
                    generatedNumbers = [];
                    i = 0;
                    I = 1;
                    mainLoop();
                  }
                }
                // if easy mode is on
              } else {
                for (j = 0; j < userInput.length; j++) {
                  if (userInput[j] !== generatedNumbers[j]) {
                    userInput = [];
                    i = 0;
                    $('.counter').text('Wrong!');
                    window.setTimeout(function() {$('.counter').text(I);}, 1000);
                    $('.background').addClass('disabled');
                    interval = window.setInterval(showButton, delay1);
                  }
                }
              }
            }
        });
  } // end of Main loop

// start button click
  $('#start').click(function() {
    userInput = [];
    // disable start button
    $(this).addClass('disabled');
    //start main loop (generate random Number)
    mainLoop();
    $('.background').addClass('disabled');
  });

// reset button click
  $('#reset').click(function() {
    userInput = [];
    I = 1;
    if ($('#start').hasClass('disabled')) {
      $('#start').removeClass('disabled');
    }
    generatedNumbers = [];
    $('.counter').text('00');
  });

});
