ALTER TABLE posts
    ADD is_draft   BOOLEAN AFTER body,
    ADD written_by INT NOT NULL AFTER is_draft;
