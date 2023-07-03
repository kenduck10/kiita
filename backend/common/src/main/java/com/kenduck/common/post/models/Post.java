package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPost;
import com.kenduck.common.post.dtos.CreatePost;
import com.kenduck.common.post.dtos.UpdatePost;

public class Post extends GeneratedPost {

    public static final int MAX_TITLE_LENGTH = 100;

    public Post(GeneratedPost generatedPost) {
        super(
                generatedPost.getId(),
                generatedPost.getTitle(),
                generatedPost.getIsDraft(),
                generatedPost.getAuthorId(),
                generatedPost.getBody()
        );
    }

    public Post(CreatePost createPost) {
        super(
                null,
                createPost.getTitle(),
                createPost.isDraft(),
                createPost.getAuthorId(),
                createPost.getBody()
        );
    }

    public Post(UpdatePost updatePost) {
        super(
                updatePost.getPostId(),
                updatePost.getTitle(),
                updatePost.isDraft(),
                updatePost.getAuthorId(),
                updatePost.getBody()
        );
    }
}
