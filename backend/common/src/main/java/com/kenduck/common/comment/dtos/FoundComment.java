package com.kenduck.common.comment.dtos;

import com.kenduck.common.comment.models.Comment;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@EqualsAndHashCode
public class FoundComment {

    private final int commentId;

    private final String body;

    private final LocalDateTime commentedAt;

    private boolean isDeleted;

    public FoundComment(Comment comment) {
        this.commentId = comment.getId();
        this.body = comment.getBody();
        this.commentedAt = comment.getCommentedAt();
        this.isDeleted = comment.getIsDeleted();
    }
}
