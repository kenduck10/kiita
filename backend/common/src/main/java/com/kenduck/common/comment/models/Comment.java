package com.kenduck.common.comment.models;


import com.kenduck.common.comment.dtos.CreateComment;
import com.kenduck.common.generated.models.GeneratedComment;

public class Comment extends GeneratedComment {


    public Comment(GeneratedComment generatedComment) {
        super(
                generatedComment.getId(),
                generatedComment.getPostId(),
                generatedComment.getCommenterId(),
                generatedComment.getCommentedAt(),
                generatedComment.getIsDeleted(),
                generatedComment.getBody()
        );
    }

    public Comment(CreateComment createComment) {
        super(
                null,
                createComment.getPostId(),
                createComment.getCommenterId(),
                null,
                null,
                createComment.getBody()
        );
    }
}
