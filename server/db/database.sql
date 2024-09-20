CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    dob DATE,
    info VARCHAR(255),
    event_id INT,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);


CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255),
    description TEXT
);


