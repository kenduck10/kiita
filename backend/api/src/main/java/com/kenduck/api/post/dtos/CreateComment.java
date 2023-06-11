package com.kenduck.api.post.dtos;

import com.kenduck.api.post.requests.CreateCommentRequest;

public class CreateComment extends com.kenduck.common.comment.dtos.CreateComment {
    public CreateComment(int postId, CreateCommentRequest request) {
        super(
                postId,
                request.getBody()
        );
    }
}
