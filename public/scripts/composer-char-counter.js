$( document ).ready(function() {
  $( '#tweet-text' ).on('input', function(event) {
    const max = 140;
    const counter = this.value.length;
    const remainder = max - counter;
    const tweetChar = $( this ).parent().children('#new-tweet-footer').children('#counter');
    
    // If >140 characters, then colour is red, otherwise colour is default.
    remainder < 0 ? tweetChar.css('color', 'red') : tweetChar.css('color', 'inherit');
    
    // Update the character counter value each time the input handler is triggered.
    tweetChar.val(remainder);
  });
});