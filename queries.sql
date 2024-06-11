DROP TABLE IF EXISTS books;

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
	author VARCHAR(100) NOT NULL,
  isbn BIGINT,
	review TEXT,
  rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
	date_read DATE
);

INSERT INTO books (title, author, isbn, review, rating, date_read) 
VALUES 
(
	'Prayer: Experiencing Awe and Intimacy with God',
	'Timothy Keller',
  9780143108580,
	'A thought-provoking and spiritually enriching book on talking to the big guy upstairs. Keller draws heavily from the works of Augustine, Luther, Calvin, Owen, and Edwards. I was very encouraged by this book and would recommend it to anyone looking to improve their prayer life.',
	4.5,
	'2023-01-30'
), 
(
	'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
	'James Clear',
  9781847941848,
	'Practical advice on how to build better habits and break bad ones. Great insight on prioritizing small changes instead of huge overhauls. I would strongly recommend this book to anybody who wants to level up and become the best version of themselves.',
	5,
	'2023-03-20'
),
(
	'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
	'Mark Manson',
  9781760558772,
	'A refreshing and brutally honest take on self-help. With humor and a dose of tough love, Manson tells it like it is, showing you how to care less about the stuff that doesn''t matter and focus on what truly lights your fire.',
	5,
 	'2023-04-15'
),
(
	'Deep Work: Rules for Focused Success in a Distracted World',
	'Cal Newport',
  9781455586691,
	'A game-changer for anyone seeking to cut through the clutter of distraction and constant interruptions. A book I definitely intend on reading again.',
	5,
 	'2023-06-23'
),
(
	'Harry Potter and the Sorcerer''s Stone',
	'J. K. Rowling',
  9780590353427,
	'Nostalgic, magical, and whimsical. My first time re-reading this book since middle school and it didn''t disappoint.',
	5,
 	'2023-07-05'
),
(
	'Find Your People: Building Deep Community in a Lonely World',
	'Jennie Allen',
  9780593193389,
	'A deep dive into the importance of community and relationship building. While Allen''s advice felt genuine and heartfelt, it was hard to translate into my own life.',
	2.5,
 	'2023-08-17'
),
(
	'Sacred Marriage',
	'Gary L. Thomas',
  9780310242826,
	'This was not the easiest read, but the core message is very thought provoking. Thomas emphasizes the potential for spiritual growth and personal transformation in marriage.',
	3.5,
 	'2023-10-24'
),
(
	'Ego is the Enemy',
	'Ryan Holiday',
  9781591847816,
	'A reality check we all need. Holiday shows how ego can trip you up on the road to success. Filled with relatable stories and down-to-earth wisdom, Holiday''s book reminds you to stay humble and keep hustling.',
	5,
 	'2023-11-19'
),
(
	'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
	'Morgan Housel',
  9780857197689,
	'This book felt like a chat with a wise friend who''s been around the financial block. Housel gives insights into how to think and behave about money, ultimately encouraging readers to save more, invest money for the long term, and expect the unexpected.',
	4.5,
 	'2024-01-20'
),
(
	'Fast Like a Girl',
	'Dr. Mindy Pelz',
  9781401969929,
	'A deep dive into the female body and how to fast in alignment with the female hormonal cycle. A fascinating read for any woman.',
	4.5,
 	'2024-02-24'
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100)
);

INSERT INTO users (username, password)
VALUES ('admin', '$2b$10$sff.j43VzUDBp7ZB3fvhSOU21lx5p2r984Tk/kACYazHKaRfG7jie');