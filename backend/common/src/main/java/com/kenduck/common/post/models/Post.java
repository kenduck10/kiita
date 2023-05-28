package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPost;

public class Post extends GeneratedPost {

    public static final int MAX_TITLE_LENGTH = 100;

    public Post(GeneratedPost generatedPost) {
        super(
                generatedPost.getId(),
                generatedPost.getTitle(),
                generatedPost.getBody()
        );
    }
}
