package com.kenduck.common.comment.services;

import com.kenduck.common.comment.dtos.CreateComment;
import com.kenduck.common.comment.mappers.CommentMapper;
import com.kenduck.common.comment.models.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateCommentService {

    @NonNull
    private final CommentMapper commentMapper;

    @Transactional
    public int createComment(CreateComment createComment) {
        Comment comment = new Comment(createComment);
        // null指定カラムはDBデフォルト値を採用したいためinsertSelectiveを使用
        commentMapper.insertSelective(comment);
        return comment.getId();
    }
}
