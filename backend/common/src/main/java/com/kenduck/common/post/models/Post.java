package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPost;
import com.kenduck.common.post.dtos.CreatePost;

public class Post extends GeneratedPost {

    public static final int MAX_TITLE_LENGTH = 100;

    public Post(GeneratedPost generatedPost) {
        super(
                generatedPost.getId(),
                generatedPost.getTitle(),
                generatedPost.getBody()
        );
    }

    public Post(CreatePost createPost) {
        super(
                null,
                createPost.getTitle(),
                createPost.getBody()
        );
    }
}
