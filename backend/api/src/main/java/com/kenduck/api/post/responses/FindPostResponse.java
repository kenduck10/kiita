package com.kenduck.api.post.responses;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.*;

@Getter
@ToString
@EqualsAndHashCode
public class FindPostResponse {

    private final String title;

    private final String body;

    private final int authorId;

    private final String authorName;

    private final LocalDate firstPublishedAt;

    private final LocalDate lastPublishedAt;

    private final Boolean isRePublished;

    public FindPostResponse(FoundPost foundPost, ZoneId zoneId) {
        Post post = foundPost.getPost();
        this.title = post.getTitle();
        this.body = post.getBody();

        Member author = foundPost.getAuthor();
        this.authorId = author.getId();
        this.authorName = author.getName();

        PostPublicationTimestamp timestamp = foundPost.getPostPublicationTimestamp();
        LocalDateTime firstPublishedAt = timestamp.getFirstPublishedAt();
        LocalDateTime lastPublishedAt = timestamp.getLastPublishedAt();
        this.firstPublishedAt = toZonedDateTime(firstPublishedAt, zoneId).toLocalDate();
        this.lastPublishedAt = toZonedDateTime(lastPublishedAt, zoneId).toLocalDate();
        this.isRePublished = !firstPublishedAt.isEqual(lastPublishedAt);
    }

    private ZonedDateTime toZonedDateTime(LocalDateTime localDateTime, ZoneId zoneId) {
        return OffsetDateTime
                .of(localDateTime, ZoneOffset.UTC)
                .toZonedDateTime()
                .withZoneSameInstant(zoneId);
    }
}
