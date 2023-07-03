package com.kenduck.api.post.responses;

import com.kenduck.common.comment.dtos.FoundComment;
import com.kenduck.common.comment.dtos.FoundComments;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
public class FindCommentsResponse {

    private final List<Comment> comments;

    public FindCommentsResponse(FoundComments foundComments) {
        this.comments = foundComments
                .getValue()
                .stream()
                .map(Comment::new)
                .toList();
    }

    @Getter
    @ToString
    @EqualsAndHashCode
    private static class Comment {

        private static final String DELETED_COMMENT_BODY = "このコメントは削除されました。";

        private final int commentId;

        private final int commenterId;

        private final String body;

        private final LocalDateTime commentedAt;

        private final boolean isDeleted;

        private Comment(FoundComment foundComment) {
            this.commentId = foundComment.getCommentId();
            this.commenterId = foundComment.getCommenterId();
            this.body = foundComment.isDeleted() ? DELETED_COMMENT_BODY : foundComment.getBody();
            this.commentedAt = foundComment.getCommentedAt();
            this.isDeleted = foundComment.isDeleted();
        }
    }
}
