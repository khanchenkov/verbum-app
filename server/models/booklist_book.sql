create TABLE "booklist_book" (
    id SERIAL PRIMARY KEY,
    book_id INT,
    booklist_id INT,
    FOREIGN KEY (book_id) REFERENCES "book" (id),
    FOREIGN KEY (booklist_id) REFERENCES "booklist" (id)
);