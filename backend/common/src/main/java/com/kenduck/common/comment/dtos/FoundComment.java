package com.kenduck.common.comment.dtos;

import com.kenduck.common.comment.models.Comment;
import com.kenduck.common.member.models.Member;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundComment {

    private final Comment comment;

    private final Member commenter;

    public FoundComment(Comment comment, Member commenter) {
        this.comment = comment;
        this.commenter = commenter;
    }
}
