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
  // if (sort === "title") {
  //   result = await db.query("SELECT * FROM book ORDER BY title ASC");
  // } else if (sort === "date") {
  //   result = await db.query("SELECT * FROM book ORDER BY date_read DESC");
  // } else if (sort === "rating") {
  //   result = await db.query("SELECT * FROM book ORDER BY rating DESC");
  // } else {
  //   result = await db.query("SELECT * FROM book");
  // }
  
  res.render("index.ejs", { books: result.rows })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});