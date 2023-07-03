package com.kenduck.api.post.dtos;

import com.kenduck.api.auth.LoginMember;
import com.kenduck.api.post.requests.CreateCommentRequest;

public class CreateComment extends com.kenduck.common.comment.dtos.CreateComment {
    public CreateComment(int postId, LoginMember loginMember, CreateCommentRequest request) {
        super(
                postId,
                loginMember.getId(),
                request.getBody()
        );
    }
}
