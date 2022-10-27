create TABLE "token" (
    id SERIAL PRIMARY KEY,
    refresh_token VARCHAR(255),
    user_id INT,
    user_device VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);