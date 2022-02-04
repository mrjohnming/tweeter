$( document ).ready(function() {
  $( '#tweet-text' ).on('input', function(event) {
    const max = 140;
    const counter = this.value.length;
    const remainder = max - counter;
    const tweetChar = $( this ).parent().children('.tweet-footer').children('.tweet-char');
    
    // The character counter will change from the default (inherited) colour to red when >140 characters.
    remainder < 0 ? tweetChar.css('color', 'red') : tweetChar.css('color', 'inherit');
    
    // Update the character counter each time the length of characters has changed.
    tweetChar.val(remainder);
  });
});