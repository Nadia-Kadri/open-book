const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArray = [...ratingInputs];

// Event Listeners
document.querySelector("#title").addEventListener("keydown", handleTitleInputKeyDown);
ratingInputs.forEach(element => {
  element.addEventListener("click", handleRatingInputClick);
});

function handleTitleInputKeyDown(e) {
  console.log(e);
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