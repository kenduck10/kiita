package com.kenduck.api.post.dtos;

import com.kenduck.api.auth.LoginMember;
import com.kenduck.api.post.requests.CreatePostRequest;

public class CreatePost extends com.kenduck.common.post.dtos.CreatePost {
    public CreatePost(CreatePostRequest request, LoginMember loginMember) {
        super(
                request.getTitle(),
                request.getIsDraft(),
                loginMember.getId(),
                request.getBody()
        );
    }
}
