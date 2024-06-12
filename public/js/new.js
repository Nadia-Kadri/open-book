const form = document.querySelector("#new-book-form");
const titleInput = form.title;
const authorInput = form.author;
const isbnInput = form.isbn;
const reviewInput = form.review;
const date_readInput = form.date_read;

const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArr = [...ratingInputs];

const titleSearchDropdown = document.querySelector(".titleSearchDropdown");

// Event Listeners
titleInput.addEventListener("keyup", handleTitleInputKeyUp);
titleInput.addEventListener("focusout", () => setTimeout(() => titleSearchDropdown.innerHTML = "", 500));

ratingInputs.forEach(el => el.addEventListener("click", handleRatingInputClick));

form.addEventListener("submit", validateFormData);

// Event Handlers
async function handleTitleInputKeyUp() {
  const input = titleInput.value.toLowerCase().replace(/\s/g, "+");
  const searchResult = await openLibrarySearch(input);
  createDropdownItems(searchResult);
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

function validateFormData(e) {
  if (titleInput.value.length > 200) {
    alert("Title character count of 200 exceeded, please enter a valid title");
    e.preventDefault();
  }
  if (authorInput.value.length > 100) {
    alert("Author name character count of 100 exceeded, please enter a valid author name");
    e.preventDefault();
  }
  if (isbnInput.value.length > 13 || isbnInput.value.length < 10 || /\D/.test(isbnInput.value)) {
    alert("Invalid ISBN: Please enter a 10 or 13 digit ISBN without dashes. ISBNs should only contain numbers.");
    e.preventDefault();
  }
  if (reviewInput.value.length > 10000) {
    alert("Review character count of 10,000 exceeded, please enter a valid review");
    e.preventDefault();
  }
  const currentYear = new Date().getFullYear();
  const inputYear = parseInt(date_readInput.value.split("-")[0]);
  if (inputYear < 1924 || inputYear > currentYear) {
    alert("Please enter a valid date");
    e.preventDefault();
  }
}


// Open Library API
async function openLibrarySearch(input) {
  let bookArr = [];
  
  try {
    const res = await axios.get('https://openlibrary.org/search.json?title=' + input + "&limit=5");
    res.data.docs.forEach(book => {
      let bookObj = {
        title: book.title ? book.title : "",
        author: book.author_name ? book.author_name[0] : "",
        isbn: book.isbn ? book.isbn[0] : ""
      }
      bookArr.push(bookObj);
    });
  } catch (err) {
    console.log(err);
  }
  
  return bookArr;
}

// Dropdown HTML
function createDropdownItems(arr) {
  titleSearchDropdown.innerHTML = "";
  arr.forEach(el => {
    let div = document.createElement('div');
    div.classList.add("titleSearchDropdown_item", "border", "p-1");
    div.innerHTML = `
      <div class="small fw-medium">${el.title}</div>
      <div class="small">by ${el.author}</div>
    `;
    titleSearchDropdown.appendChild(div);
    div.addEventListener("click", (e) => {
      titleInput.value = el.title;
      authorInput.value = el.author;
      isbnInput.value = el.isbn;
    });
  });  
}