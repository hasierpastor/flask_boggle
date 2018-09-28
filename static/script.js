$(document).ready(function() {
  $('#submit-guess').on('click', () => {
    let guess = $('#guess').val();
    $.ajax({
      url: '/',
      type: 'POST',
      data: { word: guess },
      success: resp => {
        console.log(resp);
      }
    });
  });
});
