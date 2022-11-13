create TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    user_password VARCHAR(255),
    user_name VARCHAR(255),
    status TEXT,
    avatar TEXT,
    user_current_date DATE,
    days_reading INT,
    daily_goal INT,
    reading_time INT,
    is_activated BOOLEAN,
    activation_link VARCHAR(255),
    reset_link VARCHAR(255)
);
create TABLE "token" (
     id SERIAL PRIMARY KEY,
     refresh_token VARCHAR(255),
     user_id INT,
     user_device VARCHAR(255),
     FOREIGN KEY (user_id) REFERENCES "user" (id)
);
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
create TABLE "booklist" (
    id SERIAL PRIMARY KEY,
    booklist_name VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);
create TABLE "booklist_book" (
     id SERIAL PRIMARY KEY,
     book_id INT,
     booklist_id INT,
     FOREIGN KEY (book_id) REFERENCES "book" (id),
     FOREIGN KEY (booklist_id) REFERENCES "booklist" (id)
);