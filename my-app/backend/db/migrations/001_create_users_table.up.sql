CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    user_age INT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    password VARCHAR(255) NOT NULL
);
