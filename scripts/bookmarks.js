/* global $*/
'use strict';

const bookmarks = (function() {
  function ratingStars() {
    $(':radio').change(function() {
      //FIXME: use this event listner to save the value later
      console.log('New star rating: ' + this.value);
    });
  }

  function bindEventListeners() {
    //TODO: call all functions above here
    console.log('bind works');
  }

  return {
    //TODO: expose any function I want to use in my index.js here
    ratingStars,
    bindEventListeners
  };
})();
