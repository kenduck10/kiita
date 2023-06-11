CREATE TABLE member_passwords
(
    member_id  INT                                                             NOT NULL PRIMARY KEY,
    password   VARCHAR(72)                                                     NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (member_id) REFERENCES members (id)
);
