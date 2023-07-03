ALTER TABLE posts
    ADD FOREIGN KEY (author_id) REFERENCES members (id);
