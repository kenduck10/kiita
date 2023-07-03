ALTER TABLE posts
    ADD is_draft  BOOLEAN AFTER body,
    ADD author_id INT NOT NULL AFTER is_draft;
