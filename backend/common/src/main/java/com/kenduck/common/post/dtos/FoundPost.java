package com.kenduck.common.post.dtos;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundPost {

    private final Post post;

    private final Member author;

    private final PostPublicationTimestamp postPublicationTimestamp;

    public FoundPost(Post post, Member author, PostPublicationTimestamp timestamp) {
        this.post = post;
        this.author = author;
        this.postPublicationTimestamp = timestamp;
    }

}
