const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArr = [...ratingInputs];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const isbnInput = document.querySelector("#isbn");

const titleSearchDropdown = document.querySelector(".titleSearchDropdown");

// Event Listeners
titleInput.addEventListener("keyup", handleTitleInputKeyUp);
titleInput.addEventListener("focusout", () => setTimeout(() => titleSearchDropdown.innerHTML = "", 500));

ratingInputs.forEach(el => el.addEventListener("click", handleRatingInputClick));

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