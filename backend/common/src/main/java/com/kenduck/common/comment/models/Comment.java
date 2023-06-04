package com.kenduck.common.comment.models;


import com.kenduck.common.generated.models.GeneratedComment;

public class Comment extends GeneratedComment {


    public Comment(GeneratedComment generatedComment) {
        super(
                generatedComment.getId(),
                generatedComment.getPostId(),
                generatedComment.getCommentedAt(),
                generatedComment.getIsDeleted(),
                generatedComment.getBody()
        );
    }

//    public Comment(CreatePost createPost) {
//        super(
//                null,
//                createPost.getTitle(),
//                createPost.getBody()
//        );
//    }
//
//    public Comment(UpdatePost updatePost) {
//        super(
//                updatePost.getPostId(),
//                updatePost.getTitle(),
//                updatePost.getBody()
//        );
//    }
}
