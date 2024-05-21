const ratingInputs = document.querySelectorAll(".rating-input");
const ratingInputsArr = [...ratingInputs];
const titleInput = document.querySelector("#title");
const titleSearchDropdown = document.querySelector(".titleSearchDropdown");

// Event Listeners
titleInput.addEventListener("keyup", handleTitleInputKeyUp);

titleInput.addEventListener("focusin", () => titleSearchDropdown.style.visibility = "visible");
titleInput.addEventListener("focusout", () => titleSearchDropdown.style.visibility = "hidden");

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
  let html = ``;
  arr.forEach(el => {
    let div = `
      <div class="titleSearchDropdown_item border bg-body-tertiary p-1" data-isbn="${el.isbn}">
        <div class="small fw-medium">${el.title}</div>
        <div class="small">by ${el.author}</div>
      </div>
    `;
    html = html + div;
  });

  titleSearchDropdown.innerHTML = html;
}