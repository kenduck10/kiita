package com.kenduck.api.post.dtos;

import com.kenduck.api.auth.LoginMember;
import com.kenduck.api.post.requests.UpdatePostRequest;

public class UpdatePost extends com.kenduck.common.post.dtos.UpdatePost {
    public UpdatePost(int postId, UpdatePostRequest request, LoginMember loginMember) {
        super(
                postId,
                request.getTitle(),
                request.getIsDraft(),
                loginMember.getId(),
                request.getBody()
        );
    }
}
