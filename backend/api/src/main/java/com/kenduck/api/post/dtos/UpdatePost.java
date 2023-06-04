package com.kenduck.api.post.dtos;

import com.kenduck.api.post.requests.UpdatePostRequest;

public class UpdatePost extends com.kenduck.common.post.dtos.UpdatePost {
    public UpdatePost(int postId, UpdatePostRequest request) {
        super(
                postId,
                request.getTitle(),
                request.getBody()
        );
    }
}
