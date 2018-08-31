'use strict';

//TODO: STORE function
// - functions needed to alter current state of store
// - return store with defaults and called functions

const STORE = (function() {
  //functions on my STORE

  //error message
  const setErrorMessage = function(error) {};

  //form expander
  const toggleFormExpanded = function() {
    this.formExpanded = !this.formExpanded;
  };

  //add bookmark
  const addBookmark = function(bookmark) {
    this.items.push(bookmark);
  };

  //find by id
  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  //expanded bookmark
  const expandBookmark = function(id) {
    const selectedBookmark = this.findById(id);
    selectedBookmark.expanded = !selectedBookmark.expanded;
    // console.log(selectedBookmark);
  };

  // find and delete bookmark
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  //TODO: find and update bookmark
  // const findAndUpdate = function(id, newData) {};

  // filter by rating
  const setFilterBy = function(rating) {
    this.filterBy = rating;
  };

  return {
    items: [],
    errorMessage: '',
    formExpanded: false,
    filterBy: 0,

    setErrorMessage,
    toggleFormExpanded,
    addBookmark,
    findById,
    findAndDelete,
    //  findAndUpdate,
    setFilterBy,
    expandBookmark
  };
})();
