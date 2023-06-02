package com.kenduck.api.post.responses;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class CreatePostResponse {

    private final int postId;

    public CreatePostResponse(int postId) {
        this.postId = postId;
    }
}
