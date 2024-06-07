DROP TABLE IF EXISTS book;

CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
	author VARCHAR(100) NOT NULL,
  isbn BIGINT,
	review TEXT,
  rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
	date_read DATE
);

INSERT INTO book (title, author, isbn, review, rating, date_read) 
VALUES 
(
	'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
	'James Clear',
  9781847941848,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	5,
	'2023-02-01'
), 
(
	'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
	'Morgan Housel',
  9780857197689,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	4.5,
 	'2024-01-01'
),
(
	'Harry Potter and the Sorcerer''s Stone',
	'J. K. Rowling',
  9780590353427,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	5,
 	'2024-03-01'
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100)
);

INSERT INTO users (username, password)
VALUES ('admin', '$2b$10$sff.j43VzUDBp7ZB3fvhSOU21lx5p2r984Tk/kACYazHKaRfG7jie');