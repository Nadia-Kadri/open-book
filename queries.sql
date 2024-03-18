CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
	author VARCHAR(100) NOT NULL,
	review TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 10),
	date_read DATE
);

INSERT INTO book (title, author, review, rating, date_read) 
VALUES 
(
	'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
	'James Clear',
	'Atomic Habits is a must-read for anyone looking to make lasting improvements in their life. He introduces the idea of "atomic habits," which are tiny changes that compound over time to produce significant outcomes. By focusing on the small behaviors that shape our daily lives, Clear demonstrates how anyone can create lasting change and achieve their goals. One of the standout features of the book is Clears emphasis on the importance of environment and identity in shaping behavior. He explains how our surroundings and the way we perceive ourselves play a crucial role in habit formation, and provides strategies for optimizing both to support positive change.',
	10,
	'2023-02-01'
), 
(
	'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
	'Morgan Housel',
	'The Psychology of Money is a captivating exploration of the complex relationship between human psychology and financial decision-making. Rather than focusing solely on traditional financial advice, Housel delves into the psychological factors that influence how people manage, invest, and think about money. Throughout the book, Housel emphasizes that understanding ones own psychology is just as important as understanding the mechanics of money. He illustrates this point through a series of compelling anecdotes, historical examples, and psychological insights, making the book both informative and engaging. Whether you are a seasoned investor or someone just starting to think about personal finance, this book provides valuable insights and guidance for navigating the complex world of money management.',
	10,
 	'2024-01-01'
),
(
	'Steve Jobs',
	'Walter Isaacson',
	'"Steve Jobs" by Walter Isaacson is an in-depth biography that offers a comprehensive look into the life and career of one of the most influential figures in modern technology and business. Drawing from extensive interviews with Jobs himself, as well as interviews with family members, friends, colleagues, and competitors, Isaacson presents a nuanced portrait of the man behind the Apple empire. Whether you are a fan of Apple products or simply interested in the story of one of the most influential figures of the digital age, this biography provides a compelling narrative that sheds light on the man behind the myth.',
	8,
 	'2024-03-01'
);