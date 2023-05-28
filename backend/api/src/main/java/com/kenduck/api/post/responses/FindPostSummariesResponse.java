package com.kenduck.api.post.responses;

import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.dtos.FoundPostSummary;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
public class FindPostSummariesResponse {

    private final List<Post> posts;

    public FindPostSummariesResponse(FoundPostSummaries foundPostSummaries) {
        this.posts = foundPostSummaries
                .getValue()
                .stream()
                .map(Post::new)
                .toList();
    }

    @Getter
    @ToString
    @EqualsAndHashCode
    private static class Post {

        private final int postId;

        private final String title;

        private Post(FoundPostSummary foundPostSummary) {
            this.postId = foundPostSummary.getPostId();
            this.title = foundPostSummary.getTitle();
        }
    }
}
