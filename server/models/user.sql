create TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    status TEXT,
    avatar TEXT,
    current_date DATE,
    days_reading INT,
    daily_goal INT,
    reading_time INT,
    is_activated BOOLEAN,
    activation_link VARCHAR(255),
    reset_link VARCHAR(255)
);