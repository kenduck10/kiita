package com.kenduck.common.post.dtos;

import com.kenduck.common.post.models.Post;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundPost {

    private final String title;

    private final String body;

    public FoundPost(Post post) {
        this.title = post.getTitle();
        this.body = post.getBody();
    }
}
