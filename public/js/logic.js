document.querySelector("#title").addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  console.log(e);
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