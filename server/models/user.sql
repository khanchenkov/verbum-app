create TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    user_password VARCHAR(255),
    user_name VARCHAR(255),
    status TEXT,
    avatar TEXT,
    user_current_date VARCHAR(255),
    days_reading INT,
    daily_goal INT,
    reading_time INT,
    is_activated BOOLEAN,
    activation_link VARCHAR(255),
    reset_link VARCHAR(255)
);