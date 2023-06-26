package com.kenduck.api.post.dtos;

import com.kenduck.api.auth.LoginMember;

public class DeletePost extends com.kenduck.common.post.dtos.DeletePost {
    public DeletePost(int postId, LoginMember loginMember) {
        super(
                postId,
                loginMember.getId()
        );
    }
}
