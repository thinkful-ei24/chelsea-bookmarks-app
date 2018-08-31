/* global $, bookmarkList, API, STORE*/
'use strict';

//DOM ready
function main() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  API.getBookmarks(items => {
    items.forEach(item => STORE.addBookmark(item));
    bookmarkList.render();
  });
}
$(main);
