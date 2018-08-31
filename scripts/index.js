/* global $, bookmarks, API, STORE*/

'use strict';

//DOM ready
function main() {
  bookmarks.bindEventListeners();
  bookmarks.render();

  API.getBookmarks(items => {
    items.forEach(item => STORE.addBookmark(item));
    bookmarks.render();
  });

  // Create Bookmark Test
  //   API.createBookmark(
  //     'This is a Title',
  //     'http://www.linkiscool.com',
  //     function() {
  //       console.log('success');
  //     },
  //     function() {
  //       console.log('fail');
  //     }
  //   );
}
$(main);
