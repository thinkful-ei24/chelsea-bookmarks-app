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
}
$(main);
