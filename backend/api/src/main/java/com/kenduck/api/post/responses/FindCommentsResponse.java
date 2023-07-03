package com.kenduck.api.post.responses;

import com.kenduck.common.comment.dtos.FoundComment;
import com.kenduck.common.comment.dtos.FoundComments;
import com.kenduck.common.member.models.Member;
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

        private final String commenterName;

        private final String body;

        private final LocalDateTime commentedAt;

        private final boolean isDeleted;

        private Comment(FoundComment foundComment) {
            com.kenduck.common.comment.models.Comment comment = foundComment.getComment();
            Member commenter = foundComment.getCommenter();
            this.commentId = comment.getId();
            this.commenterId = comment.getCommenterId();
            this.commenterName = commenter.getName();
            this.body = comment.getIsDeleted() ? DELETED_COMMENT_BODY : comment.getBody();
            this.commentedAt = comment.getCommentedAt();
            this.isDeleted = comment.getIsDeleted();
        }
    }
}
