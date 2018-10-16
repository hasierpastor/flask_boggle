//add dragging on board functionality?

let score = 0;
let high_score;

$(document).ready(function() {
  //when new-game button is pressed, resets timer and score

  $('#high_score').text(high_score);
  makeTimer();

  $('#submit-guess').on('click', () => {
    let guess = $('#guess')
      .val()
      .toLowerCase();
    $.ajax({
      url: '/play',
      type: 'POST',
      data: { word: guess },
      success: resp => {
        //break into seperaate function
        if (resp.result === 'ok') {
          $('#guess-message').text(`Good Job!`);
          $('#guess-message').append($('<span class="ec ec-grin"></span'));
        } else if (resp.result === 'not-word') {
          $('#guess-message').text(`Not a valid word`);
          $('#guess-message').append($('<span class="ec ec-thinking"></span>'));
        }
        displayScore(updateScore(resp.result, guess));
        $('#guess').val('');
      }
    });
  });
});

function updateScore(msg, guess) {
  let pointsForWord = guess.length;

  if (msg == 'ok') {
    score += pointsForWord;
  }
  return score;
}

function displayScore(score) {
  $('#score').text(score);
}

function makeTimer() {
  let timeLeft = 60;
  let countDown = setInterval(function() {
    timeLeft--;
    $('#timer-container').text(`Timer: ${timeLeft}`);
    if (timeLeft <= 10) {
      $('#timer-container').text(`Timer: ${timeLeft}!!`);
      $('#timer-container').append(
        $('<span class="ec ec-rotating-light"></span>')
      );
    }
    if (timeLeft <= 0) {
      clearInterval(countDown);
      $('#submit-guess').off('click');
      let score = $('#score').text() || 0;
      send_score_server(score);
    }
  }, 1000);
}

//add html to end game page
function send_score_server(score) {
  $.post('/end_game', { score }, response => {
    console.log(response);
  });
}
