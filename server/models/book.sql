create TABLE "book" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    book_path TEXT,
    thumbnail_path TEXT,
    pages INT,
    current_page INT,
    is_reading BOOLEAN,
    is_read BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);