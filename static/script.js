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
      url: '/',
      type: 'POST',
      data: { word: guess },
      success: resp => {
        $('#guess-message').text(`Message: ${resp.result}`);
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
  let count = 0;
  var newTimerId = setInterval(function() {
    ++count;
    $('#timer-container').text(count);
  }, 1000);
  setTimeout(function() {
    clearTimeout(newTimerId);
    $('#submit-guess').off('click');
    let score = $('#score').text() || 0;
    send_score_server(score);
  }, 20000);
}

function send_score_server(score) {
  $.post('/end_game', { score }, response => {
    console.log(response);
  });
}
