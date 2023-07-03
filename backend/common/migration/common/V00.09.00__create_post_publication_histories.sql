CREATE TABLE post_publication_timestamps
(
    id                 INT AUTO_INCREMENT                                              NOT NULL PRIMARY KEY,
    post_id            INT                                                             NOT NULL UNIQUE,
    first_published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    # ON UPDATE CURRENT_TIMESTAMPをつけたいところだが、カラムが一つも更新されない場合はON UPDATE〜は動かないので敢えて外している
    last_published_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);
