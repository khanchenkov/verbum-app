create TABLE "booklist" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);