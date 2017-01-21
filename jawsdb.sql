CREATE TABLE fap15sox7l46vvp5.burgers(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    burger_name VARCHAR(100) NOT NULL,
    devoured BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    date TIMESTAMP NOT NULL);