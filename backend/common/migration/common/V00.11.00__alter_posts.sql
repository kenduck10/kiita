ALTER TABLE posts
    ADD FOREIGN KEY (written_by) REFERENCES members (id);
