package com.kenduck.common.comment.services;

import com.kenduck.common.comment.mappers.CommentMapper;
import com.kenduck.common.comment.models.Comment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.comment.functions.ExceptionFunction.commentNotFoundSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteCommentService {

    @NonNull
    private final CommentMapper commentMapper;

    @Transactional
    public void deleteComment(int commentId) {
        Comment targetComment = commentMapper.selectByPrimaryKey(commentId)
                .orElseThrow(commentNotFoundSupplier(commentId));
        if (targetComment.getIsDeleted()) {
            return;
        }
        targetComment.setIsDeleted(true);
        commentMapper.updateByPrimaryKey(targetComment);
    }
}
