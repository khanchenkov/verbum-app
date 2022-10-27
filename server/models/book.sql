create TABLE "book" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    path TEXT,
    pages INT,
    current_page INT DEFAULT 0,
    is_reading BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);