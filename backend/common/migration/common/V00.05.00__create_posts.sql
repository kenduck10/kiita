CREATE TABLE posts
(
    id         INT AUTO_INCREMENT                                              NOT NULL PRIMARY KEY,
    title      VARCHAR(100)                                                    NOT NULL,
    body       TEXT                                                            NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
