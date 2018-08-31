/* global $*/
'use strict';

//API

const API = (function() {
  //BASE_URL
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chelsea-kent';

  //CREATE
  const createBookmark = function(newBookmarkData, onSuccess, onError) {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newBookmarkData,
      success: onSuccess,
      error: onError
    });
  };
  //READ
  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };
  //UPDATE
  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };
  //DELETE
  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  //return exposed functions
  return {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark
  };
})();
