$( document ).ready(function() {
  console.log("jQuery is ready!");

  $( '#tweet-text' ).on('input', function(event) {
    const max = 140;
    const counter = this.value.length;
    const remainder = max - counter;
    const tweetChar = $( '#tweet-text' ).parent().children('.tweet-footer').children('.tweet-char');
    tweetChar.val(remainder);
  });

});