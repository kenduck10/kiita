package com.kenduck.api.post.responses;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.dtos.FoundPostSummary;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
public class FindPostSummariesResponse {

    private final List<PostSummary> posts;

    public FindPostSummariesResponse(FoundPostSummaries foundPostSummaries) {
        this.posts = foundPostSummaries
                .getValue()
                .stream()
                .map(PostSummary::new)
                .toList();
    }

    @Getter
    @ToString
    @EqualsAndHashCode
    private static class PostSummary {

        private final int postId;

        private final String title;

        private final int authorId;

        private final String authorName;

        private final LocalDate firstPublishedAt;

        private PostSummary(FoundPostSummary foundPostSummary) {
            Post post = foundPostSummary.getPost();
            Member author = foundPostSummary.getAuthor();
            PostPublicationTimestamp timestamp = foundPostSummary.getPostPublicationTimestamp();

            this.postId = post.getId();
            this.title = post.getTitle();
            this.authorId = author.getId();
            this.authorName = author.getName();
            this.firstPublishedAt = timestamp.getFirstPublishedAt().toLocalDate();
        }
    }
}
