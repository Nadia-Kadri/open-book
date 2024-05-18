document.querySelector("#title").addEventListener("keydown", handleTitleInputKeyDown);
document.querySelectorAll(".rating-input").forEach(element => {
  element.addEventListener("click", handleRatingInputClick);
});

function handleTitleInputKeyDown(e) {
  console.log(e);
}

function handleRatingInputClick(e) {
  console.log(e.currentTarget);
  console.log(e.currentTarget.getAttribute("value"));
}

axios.get('https://openlibrary.org/search.json?title=harry+potter')
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