CREATE TABLE comments
(
    id           INT AUTO_INCREMENT                                              NOT NULL PRIMARY KEY,
    post_id      INT                                                             NOT NULL,
    body         TEXT                                                            NOT NULL,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    is_deleted   BOOLEAN   DEFAULT FALSE                                         NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);
