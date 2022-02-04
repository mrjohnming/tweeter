/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$( document ).ready(function() {
  
  const createTweetElement = tweetData => {
    const $tweet = `
      <div class="tweet">
        <header class="tweet-header">
        <span class="user-img"><img src="${tweetData.user.avatars}" alt="@SirIsaac profile image." width="40" height="40"></span>
          <span class="user-name">${tweetData.user.name}</span>
          <span class="user-handle">${tweetData.user.handle}</span>
        </header>
        <p class="tweet-body">${tweetData.content.text}</p>
        <footer class="tweet-footer">
          <span>${timeago.format(tweetData.created_at)}</span>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </div>
    `;
    return $tweet;
  };

  const renderTweets = tweets => {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
        $( '#tweets-container' ).prepend($tweet);
      }
    }
    
  // Form submission using JQuery.
  $( '.tweet-form' ).submit(function( event ) {
    event.preventDefault();
    const remainder = Number($( this ).children('.tweet-footer').children('.tweet-char').val());
    
    // Clear the value inside the .error-msg element the submit handler is triggered.
    $( '.error-msg' ).val('');

    // If the tweet textarea is empty, and the user tries to submit, return an appropriate responsive error message.
    if (remainder === 140) {
      return $( '.error-msg' ).val("Uh oh! Your tweet is empty.\nPlease share what you're humming about before submitting.");
    }

    // If the tweet textarea is >140 characters, and the user tries to submit, return an appropriate responsive error message.
    if (remainder < 0) {
      return $( '.error-msg' ).val(`Uh oh! Your tweet is too long.\nPlease shorten your hum by ${-remainder} characters.`);
    }
    
    // Character escape function to prevent XSS.
    const escape = function (string) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };

    const payload = escape($( this ).serialize());
    $.post('/tweets', payload)
      .then(function() {        
        
        // Clear the value inside the .error-msg element after a successful POST /tweets.
        $( '.error-msg' ).val('')

        // Clear the value inside the #tweet-tex element after a successful POST /tweets.
        $( '#tweet-text' ).val('');

        // Reset the value inside the .tweet-char element to 140 after a successful POST /tweets.
        $( '.tweet-char' ).val(140);
        
        // Add the new tweet HTML to the page without refreshing.
        $.ajax('/tweets', { method: 'GET' })
          .then(function(data) {
            const newData = data[data.length - 1];
            const $tweet = createTweetElement(newData);
            $( '#tweets-container' ).prepend($tweet);
          });
      });
  
  });
    
  // Fetch tweets with Ajax.
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
  };
    
  loadTweets();
});
