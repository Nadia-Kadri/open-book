const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArr = [...ratingInputs];
const titleInput = document.querySelector("#title");
const titleSearchDropdown = document.querySelector(".titleSearchDropdown");

// Event Listeners
titleInput.addEventListener("keyup", handleTitleInputKeyUp);

titleInput.addEventListener("focusin", () => titleSearchDropdown.style.visibility = "visible");
titleInput.addEventListener("focusout", () => titleSearchDropdown.style.visibility = "hidden");

ratingInputs.forEach(el => el.addEventListener("click", handleRatingInputClick));

function handleTitleInputKeyUp() {
  const input = titleInput.value.toLowerCase().replace(/\s/g, "+");
  input.length >= 3 ? openLibrarySearch(input) : null;
}

function handleRatingInputClick(e) {
  const selectedValue = parseFloat(e.currentTarget.getAttribute("value"));

  ratingInputsArr.forEach(el => {
    if (parseFloat(el.getAttribute("value")) <= selectedValue) {
      el.classList.replace("fa-regular", "fa-solid");
    } else {
      el.classList.replace("fa-solid", "fa-regular");
    }
  });
}

function openLibrarySearch(input) {
  axios.get('https://openlibrary.org/search.json?title=' + input + "&limit=5")
  .then(res => {
    let bookArr = [];

    res.data.docs.forEach(book => {
      let bookObj = {
        title: book.title ? book.title : "",
        author: book.author_name ? book.author_name : "",
        isbn: book.isbn ? book.isbn[0] : ""
      }
      bookArr.push(bookObj);
    });

    console.log(bookArr);
  })
  .catch(err => console.log(err));
}