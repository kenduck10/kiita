package com.kenduck.common.comment.dtos;

import com.kenduck.common.comment.models.Comment;
import com.kenduck.common.comment.models.Comments;
import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.Members;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@EqualsAndHashCode
public class FoundComments {

    private final List<FoundComment> value;

    public FoundComments(Comments comments, Members commenters) {
        this.value = comments
                .getValue()
                .stream()
                .map(comment -> mapToFoundComment(comment, commenters))
                .toList();
    }

    private FoundComment mapToFoundComment(Comment comment, Members commenters) {
        int commenterId = comment.getCommenterId();
        Member commenter = commenters
                .findFirstByMemberId(commenterId)
                .orElseThrow(() -> new IllegalArgumentException("commenter is not found (commenterId = " + commenterId + ")"));
        return new FoundComment(comment, commenter);
    }
}
