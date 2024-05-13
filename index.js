import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "openbook",
  password: "admin123",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  // /?sort=title /?sort=date /?sort=rating
  const sort = req.query.sort;
  let result;

  if (sort) {
    sort === "title" ? result = await db.query("SELECT * FROM book ORDER BY title ASC") : "";
    sort === "date" ? result = await db.query("SELECT * FROM book ORDER BY date_read DESC") : "";
    sort === "rating" ? result = await db.query("SELECT * FROM book ORDER BY rating DESC") : "";
  } else {
    result = await db.query("SELECT * FROM book");
  }
  
  res.render("index.ejs", { books: result.rows })
});

app.get("/new", async (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  const book = req.body;
  await db.query(
    "INSERT INTO book (title, author, isbn, review, rating, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
    [book.title, book.author, book.isbn, book.review, book.rating, book.date_read]
  );
  console.log(book);
  // res.send("Book added");
  res.redirect("/?sort=date");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    "SELECT * FROM book WHERE id = $1",
    [id]
  );
  const book = result.rows;

  await db.query(
    "DELETE FROM book WHERE id = $1",
    [id]
  );
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});