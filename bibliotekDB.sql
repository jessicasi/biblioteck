CREATE TABLE movie 
( 
    movie_id serial NOT NULL Primary Key,
    movie_name VARCHAR(75) NOT NULL,
    movie_summary TEXT
);


ALTER TABLE movie

    ADD COLUMN genre_id INT,
    ADD COLUMN image_id INT,
    ADD COLUMN series_id INT,
    ADD COLUMN review_id INT,
    ADD COLUMN location_id INT;

ALTER TABLE movie
ADD CONSTRAINT fk_genre_id FOREIGN KEY (genre_id) references genre(genre_id),
ADD CONSTRAINT fk_image_id FOREIGN KEY (image_id) references image(image_id),
ADD CONSTRAINT fk_series_id FOREIGN KEY (series_id) references series(series_id),
ADD CONSTRAINT fk_review_id FOREIGN KEY (review_id) references review(review_id),
ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) references location(location_id);



CREATE TABLE book
(
    book_id serial NOT NULL Primary Key,
    book_name VARCHAR(75) NOT NULL,
    book_format VARCHAR(20) NOT NULL,
    book_summary TEXT
  
);

ALTER TABLE book
    ADD COLUMN image_id INT,
    ADD COLUMN series_id INT,
    ADD COLUMN review_id INT,
    ADD COLUMN location_id INT;

ALTER TABLE book
  ADD CONSTRAINT fk_series_id FOREIGN KEY (series_id) references series(series_id),
    ADD CONSTRAINT fk_review_id FOREIGN KEY (review_id) references review(review_id),
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) references location(location_id);

CREATE TABLE location
(
    location_id serial NOT NULL Primary Key,
    location_name VARCHAR(50) NOT NULL
);

CREATE TABLE series 
(
    series_id serial NOT NULL Primary Key,
    series_name VARCHAR(100) NOT NULL,
    series_status boolean NOT NULL

);

ALTER TABLE series

    ADD COLUMN review_id INT;

    ALTER TABLE series
ADD CONSTRAINT fk_review_id FOREIGN KEY (review_id) references review(review_id);


CREATE TABLE book_author
(
    
);

ALTER TABLE book_author

    ADD COLUMN book_id INT,
    ADD COLUMN author_id INT;

ALTER TABLE book_author

ADD CONSTRAINT fk_book_id FOREIGN KEY (book_id) references book(book_id),
    ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) references author(author_id);



book_id INT references book.book_id,
    author_id INT references author.author_id

CREATE TABLE movie_book_genre
(
    
);

ALTER TABLE movie_book_genre

    ADD COLUMN movie_id INT,
    ADD COLUMN book_id INT,
    ADD COLUMN genre_id INT;


ALTER TABLE movie_book_genre

ADD CONSTRAINT fk_book_id FOREIGN KEY (book_id) references book(book_id),
ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) references movie(movie_id),
ADD CONSTRAINT fk_genre_id FOREIGN KEY (genre_id) references genre(genre_id);




CREATE TABLE author
(
    author_id serial NOT NULL Primary Key,
    author_name VARCHAR(75)
);

CREATE TABLE review
(
    review_id serial NOT NULL Primary Key,
    review_text TEXT NOT NULL
);


CREATE TABLE genre
(
    genre_id serial NOT NULL Primary Key,
    genre_name VARCHAR(25) NOT NULL
);

CREATE TABLE image (
    image_id serial NOT NULL Primary Key,
    image_name VARCHAR(100) NOT NULL,
    image_path VARCHAR(100) NOT NULL
);