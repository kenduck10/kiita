package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.UpdatePost;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.post.functions.ExceptionFunction.postNotFoundSupplier;

@Service
@RequiredArgsConstructor
public class UpdatePostService {

    @NonNull
    private final PostMapper postMapper;

    @Transactional
    public void updatePost(UpdatePost updatePost) {
        int postId = updatePost.getPostId();
        postMapper.selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        Post post = new Post(updatePost);
        postMapper.updateByPrimaryKey(post);
    }
}
