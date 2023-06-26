CREATE TABLE members
(
    id           INT AUTO_INCREMENT                                              NOT NULL PRIMARY KEY,
    name         VARCHAR(50)                                                     NOT NULL UNIQUE,
    mail_address VARCHAR(319)                                                    NOT NULL UNIQUE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
