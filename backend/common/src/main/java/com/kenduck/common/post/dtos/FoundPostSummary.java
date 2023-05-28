package com.kenduck.common.post.dtos;

import com.kenduck.common.post.models.Post;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundPostSummary {

    private final int postId;

    private final String title;

    public FoundPostSummary(Post post) {
        this.postId = post.getId();
        this.title = post.getTitle();
    }
}
