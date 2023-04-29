CREATE TABLE users
(
    ID         INT AUTO_INCREMENT                                              NOT NULL PRIMARY KEY,
    last_name  VARCHAR(50)                                                     NOT NULL,
    first_name VARCHAR(50)                                                     NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
