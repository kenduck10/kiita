package com.kenduck.api.post.responses;

import com.kenduck.common.post.dtos.FoundPost;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class FindPostResponse {

    private final String title;

    private final String body;

    public FindPostResponse(FoundPost foundPost) {
        this.title = foundPost.getTitle();
        this.body = foundPost.getBody();
    }
}
