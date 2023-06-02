package com.kenduck.api.post.dtos;

import com.kenduck.api.post.requests.CreatePostRequest;

public class CreatePost extends com.kenduck.common.post.dtos.CreatePost {
    public CreatePost(CreatePostRequest request) {
        super(
                request.getTitle(),
                request.getBody()
        );
    }
}
