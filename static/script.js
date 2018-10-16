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
        } else if (resp.result === 'not-word') {
          $('#guess-message').text(`Not a valid word :(`);
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
  let count = 0;
  var newTimerId = setInterval(function() {
    ++count;
    $('#timer-container').text(`Timer: ${count}`);
  }, 1000);
  setTimeout(function() {
    clearTimeout(newTimerId);
    $('#submit-guess').off('click');
    let score = $('#score').text() || 0;
    send_score_server(score);
  }, 60000);
}

function send_score_server(score) {
  $.post('/end_game', { score }, response => {
    console.log(response);
  });
}
