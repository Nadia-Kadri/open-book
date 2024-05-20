const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArray = [...ratingInputs];
const titleSearch = document.querySelector("#title");

// Event Listeners
titleSearch.addEventListener("keyup", handleTitleInputKeyDown);
ratingInputs.forEach(element => {
  element.addEventListener("click", handleRatingInputClick);
});

function handleTitleInputKeyDown(e) {
  const searchInput = titleSearch.value.toLowerCase().replace(/\s/g, "+");
  if (searchInput.length >= 3) {
    openLibrarySearch(searchInput);
  }
}

function handleRatingInputClick(e) {
  const selectedValue = parseFloat(e.currentTarget.getAttribute("value"));

  ratingInputsArray.forEach(element => {
    if (parseFloat(element.getAttribute("value")) <= selectedValue) {
      element.classList.replace("fa-regular", "fa-solid");
    } else {
      element.classList.replace("fa-solid", "fa-regular");
    }
  });
}

function openLibrarySearch(input) {
  axios.get('https://openlibrary.org/search.json?title=' + input + "&limit=5")
  .then(function (response) {
    // console.log(response.data.docs)
    let bookArr = [];

    response.data.docs.forEach(book => {
      let bookObj = {
        title: book.title ? book.title : "",
        author: book.author_name ? book.author_name : "",
        isbn: book.isbn ? book.isbn[0] : ""
      }
      bookArr.push(bookObj);
    });

    console.log(bookArr);
  })
  .catch(function (error) {
    console.log(error);
  });
}