ALTER TABLE comments
    MODIFY COLUMN commenter_id INT NOT NULL,
    ADD FOREIGN KEY (commenter_id) REFERENCES members (id);
