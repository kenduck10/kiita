package com.kenduck.common.post.services;

import com.kenduck.common.comment.mappers.CommentMapper;
import com.kenduck.common.post.mappers.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.post.functions.ExceptionFunction.postNotFoundSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeletePostService {

    @NonNull
    private final PostMapper postMapper;

    @NonNull
    private final CommentMapper commentMapper;

    @Transactional
    public void deletePost(int postId) {
        commentMapper.deleteByPostId(postId);
        postMapper.selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        postMapper.deleteByPrimaryKey(postId);
    }
}
