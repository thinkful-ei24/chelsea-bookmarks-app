/* global $, API, STORE*/
'use strict';

//TODO: bookmarks function
// All my functions that handle my bookmarks
// - generate HTML function
// - render my store state
// - handle event listeners & error callbacks!
// - bindEventListeners

const bookmarks = (function() {
  // //FOR MY FORMS - JQuery library edit extends library to give me an object with
  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const obj = {};
      formData.forEach((val, name) => (obj[name] = val)); //FormData only has .forEach available to it
      return JSON.stringify(obj);
    }
  });

  // create error messsage
  function generateError(error) {
    let message = '';
    if (error.responseJSON && error.responseJSON.message) {
      message = error.responseJSON.message;
    } else {
      message = `${error.code} Server Error`;
    }
    return `  
		<div class="col-12">
    	<p>${message}</p>
  	</div>`;
  }

  //-----------------------------------------------------------------------------
  //generate HTML for bookmark elements

  function generateBookmarkElement(bookmark) {
    //apply correct star rating
    const emptyStar = `<span class="icon">★</span>`;
    const checkedStar = `<span class="icon checked">★</span>`;
    let generateStars = emptyStar.repeat(5);

    const starRating = bookmark.rating;

    if (starRating === 5) {
      generateStars = `${checkedStar.repeat(5)}`;
    } else if (starRating === 4) {
      generateStars = `${checkedStar.repeat(4)} ${emptyStar.repeat(1)}`;
    } else if (starRating === 3) {
      generateStars = `${checkedStar.repeat(3)} ${emptyStar.repeat(2)}`;
    } else if (starRating === 2) {
      generateStars = `${checkedStar.repeat(2)} ${emptyStar.repeat(3)}`;
    } else if (starRating === 1) {
      generateStars = `${checkedStar.repeat(1)} ${emptyStar.repeat(4)}`;
    }

    // const holding html
    let bookmarkDesc = '';
    if (bookmark.desc) {
      bookmarkDesc = bookmark.desc;
    }
    const extendedBookmarkElements = `
		<li id="${bookmark.id}" class="expanded">
			<a class="bookmark-link js-bookmark-link">
			<h2>${bookmark.title}</h2>
			<div class="rated-stars">${generateStars}</div>
			</a>
			<p>${bookmarkDesc}</p>
		
				<a class="js-delete-bookmark">delete</a>
				<a class="js-edit-bookmark">edit</a>

			<a href="${bookmark.url}" target="blank" class="btn">Visit site</a>

</li>`;

    //if expanded state expand!
    if (bookmark.expanded) {
      return `
			${extendedBookmarkElements}
			`;
    }

    //return my html

    return `
    <li id="${bookmark.id}" class="">
			<a class="bookmark-link js-bookmark-link">
			<h2>${bookmark.title}</h2>
			<div class="rated-stars">${generateStars}</div>
			</a>
    </li>`;
  }

  //generate string of HTML
  function generateBookmarkElementsString(bookmarks) {
    const bookmarksString = bookmarks.map(bookmark => {
      //console.log(bookmark);
      return generateBookmarkElement(bookmark);
    });

    return bookmarksString.join('');
  }

  //-----------------------------------------------------------------------------
  //render
  function render() {
    // console.log('My Render!');
    let bookmarks = STORE.items;

    //if error
    if (STORE.errorMessage) {
      const mes = generateError(STORE.errorMessage);
      $('#js-error-message').html(mes);
    } else {
      $('#js-error-message').empty();
    }
    //if Filter By option selected render STORE items > than option selected
    if (STORE.filterBy) {
      bookmarks = STORE.items.filter(item => item.rating > STORE.filterBy);
    }

    // console.log(bookmarks);

    const bookmarkElementsString = generateBookmarkElementsString(bookmarks);
    // console.log(bookmarkElementsString);
    // insert that HTML into the DOM
    $('.js-bookmarks-list').html(bookmarkElementsString);
  }

  //-----------------------------------------------------------------------------
  //handleSomeAction Event listeners

  //New Bookmark Submit ---------------------------------------------------

  function clearFieldsForBookmarkForm() {
    $('#js-add-bookmark-form')
      .find('input')
      .val('');
    $('#js-add-bookmark-form')
      .find('textarea')
      .val('');
  }

  function handleNewBookmarkSubmit() {
    $('#js-add-bookmark-form').submit(function(event) {
      event.preventDefault();
      //use my JQuery extended function from above to create an object w/ correct format
      const newBookmarkData = $(event.target).serializeJson();
      clearFieldsForBookmarkForm();

      //run create bookmark function
      API.createBookmark(
        newBookmarkData,
        newBookmark => {
          STORE.errorMessage = null;
          STORE.addBookmark(newBookmark);
          render();
        },
        error => {
          console.log(error);
          STORE.setErrorMessage(error);
          render();
        }
      );
    });
  }

  //Expand bookmarks listener --------------------------------------------
  function getBookmarkIdFromElement(item) {
    return $(item)
      .closest('li')
      .attr('id');
  }

  function handleBookmarkExpand() {
    $('.bookmarks-list').on('click', '.js-bookmark-link', event => {
      const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
      //console.log(bookmarkId);
      STORE.expandBookmark(bookmarkId);
      render();
    });
  }

  //Delete listener -----------------------------------------------------
  function handleBookmarkDelete() {
    $('.bookmarks-list').on('click', '.js-delete-bookmark', event => {
      const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
      // console.log(bookmarkId);
      API.deleteBookmark(bookmarkId, () => {
        STORE.findAndDelete(bookmarkId);
        render();
      });
    });
  }

  //Filter by listener -----------------------------------------------------

  // function getBookmarksByFilterResult() {
  //   const filteredBookmarksArray = STORE.items.filter(item => {
  //     return item.rating > STORE.filterBy;
  //   });
  //   STORE.items = filteredBookmarksArray;
  // }

  function handleFilterBy() {
    $('.js-bookmark-filter').on('change', function() {
      let selectedRating = $(this).val();

      STORE.setFilterBy(selectedRating);
      render();
    });
  }

  //-----------------------------------------------------------------------------
  //Bind Event Listeners
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkExpand();
    handleBookmarkDelete();
    handleFilterBy();
  }

  return {
    //expose functions
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
