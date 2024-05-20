const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArray = [...ratingInputs];
const titleSearch = document.querySelector("#title");

// Event Listeners
titleSearch.addEventListener("keyup", handleTitleInputKeyDown);
ratingInputs.forEach(element => {
  element.addEventListener("click", handleRatingInputClick);
});

function handleTitleInputKeyDown(e) {
  // console.log(e.key);
  const searchInput = titleSearch.value.toLowerCase();
  if (searchInput.length >= 3) {
    console.log(searchInput);
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
  // 'https://openlibrary.org/search.json?title=harry+potter'
  axios.get('https://openlibrary.org/search.json?title=' + input)
  .then(function (response) {
    // handle success
    console.log(response.data.docs[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}