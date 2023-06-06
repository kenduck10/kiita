package com.kenduck.common.comment.services;

import com.kenduck.common.comment.dtos.FoundComments;
import com.kenduck.common.comment.mappers.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FindCommentService {

    @NonNull
    private final CommentMapper commentMapper;


    @Transactional(readOnly = true)
    public FoundComments findCommentsByPostId(int postId) {
        return new FoundComments(
                commentMapper.selectByPostId(postId)
        );
    }
}
