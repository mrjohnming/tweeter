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
        $( '#tweets-container' ).append($tweet);
      }
    }
    
  // Form submission using JQuery.
  $( '.tweet-form' ).submit(function( event ) {
    event.preventDefault();
    const remainder = Number($( this ).children('.tweet-footer').children('.tweet-char').val());
    
    // If the tweet textarea is empty, and the user tries to submit, return an appropriate alert message.
    if (remainder === 140) {
      return alert("Uh oh! Your tweet is empty.\nPlease share what you're humming about before submitting.");
    }

    // If the tweet textarea is >140 characters, and the user tries to submit, return an appropriate alert message.
    if (remainder < 0) {
      return alert(`Uh oh! Your tweet is too long.\nPlease shorten your hum by ${-remainder} characters.`);
    }
    const payload = $( this ).serialize();
    $.post('/tweets', payload);
  });
    
  // Fetch tweets with Ajax.
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
       console.log('data =', data);
      renderTweets(data);
    });
  };
    
  loadTweets();
});

