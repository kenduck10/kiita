package com.kenduck.common.post.dtos;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.Members;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import com.kenduck.common.post.models.PostPublicationTimestamps;
import com.kenduck.common.post.models.Posts;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@EqualsAndHashCode
public class FoundPostSummaries {

    private final List<FoundPostSummary> value;

    public FoundPostSummaries(
            Posts posts,
            Members authors,
            PostPublicationTimestamps timestamps) {
        this.value = posts
                .getValue()
                .stream()
                .map((post -> mapToFoundPostSummary(post, authors, timestamps)))
                .toList();
    }

    private FoundPostSummary mapToFoundPostSummary(
            Post post,
            Members authors,
            PostPublicationTimestamps timestamps
    ) {
        int authorId = post.getAuthorId();
        Member author = authors
                .findFirstByMemberId(authorId)
                .orElseThrow(() -> new IllegalArgumentException("author is not found (authorId = " + authorId + ")."));
        int postId = post.getId();
        PostPublicationTimestamp timestamp = timestamps
                .findFirstByPostId(postId)
                .orElseThrow(() -> new IllegalArgumentException("post publication timestamp is not found (postId = " + postId + ")."));
        return new FoundPostSummary(post, author, timestamp);
    }
}
