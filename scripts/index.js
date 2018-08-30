/* global $, bookmarks*/

'use strict';

//DOM ready
function main() {
  bookmarks.ratingStars();
  bookmarks.bindEventListeners();
}

$(main);

// //FOR MY FORMS - JQuery library edit extends library to give me an object with
// $.fn.extend({
//   serializeJson: function() {
//     const formData = new FormData(this[0]);
//     const obj = {};
//     formData.forEach((val, name) => (obj[name] = val)); //FormData only has .forEach available to it
//     return JSON.stringify(obj);
//   }
// });

// $('#form').submit(e => {
//   e.preventDefalut();
//   console.log($(e.target).serializeJson()); // call my new JQuery function on this form when submitted
// });
