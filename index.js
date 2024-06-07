import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { format } from "date-fns";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

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

  res.render("index.ejs", { books: result.rows, format: format })
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
})

app.get("/new", async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("new.ejs", { format: format });
  } else {
    res.redirect("/login");
  }
});

app.post("/new", async (req, res) => {
  const book = req.body;
  try {
    await db.query(
      "INSERT INTO book (title, author, isbn, review, rating, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [book.title, book.author, book.isbn, book.review, book.rating, book.date_read]
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/?sort=date");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM book WHERE id = $1", [id]);
  
  res.redirect("/");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/new",
    failureRedirect: "/login",
  })
);

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE username = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});