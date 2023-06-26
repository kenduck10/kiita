package com.kenduck.common.post.services;

import com.kenduck.common.comment.mappers.CommentMapper;
import com.kenduck.common.post.dtos.DeletePost;
import com.kenduck.common.post.exceptions.OthersPostFoundException;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.mappers.PostPublicationTimestampsMapper;
import com.kenduck.common.post.models.Post;
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
    private final PostPublicationTimestampsMapper postPublicationTimestampsMapper;

    @NonNull
    private final CommentMapper commentMapper;

    @Transactional
    public void deletePost(DeletePost deletePost) {
        int postId = deletePost.getPostId();
        Post targetPost = postMapper.selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        if (!targetPost.getAuthorId().equals(deletePost.getDeleterId())) {
            throw new OthersPostFoundException(postId, "others post can't be deleted. (postId = " + postId + ").");
        }
        commentMapper.deleteByPostId(postId);
        postPublicationTimestampsMapper.deleteByPostId(postId);
        postMapper.deleteByPrimaryKey(postId);
    }
}
