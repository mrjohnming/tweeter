/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$( document ).ready(function() {
  
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },

    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
    
  renderTweets(data);

  // Form submission using JQuery.
  $( '.tweet-form' ).submit(function( event ) {
    event.preventDefault() 
    const payload = $( this ).serialize();
    $.post('/tweets', payload);
  });
});