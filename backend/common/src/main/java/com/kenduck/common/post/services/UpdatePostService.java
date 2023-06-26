package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.UpdatePost;
import com.kenduck.common.post.exceptions.OthersPostFoundException;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.mappers.PostPublicationTimestampsMapper;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.kenduck.common.post.functions.ExceptionFunction.postNotFoundSupplier;

@Service
@RequiredArgsConstructor
public class UpdatePostService {

    @NonNull
    private final PostMapper postMapper;

    @NonNull
    private final PostPublicationTimestampsMapper postPublicationTimestampsMapper;

    @Transactional
    public void updatePost(UpdatePost updatePost) {
        int postId = updatePost.getPostId();
        Post targetPost = postMapper.selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        if (!targetPost.getAuthorId().equals(updatePost.getAuthorId())) {
            throw new OthersPostFoundException(postId, "others post can't be updated. (postId = " + postId + ").");
        }
        Post post = new Post(updatePost);
        postMapper.updateByPrimaryKey(post);

        if (updatePost.isDraft()) {
            return;
        }

        Optional<PostPublicationTimestamp> timestampOptional = postPublicationTimestampsMapper
                .selectByPostId(postId);

        if (timestampOptional.isEmpty()) {
            postPublicationTimestampsMapper.insert(postId);
            return;
        }
        postPublicationTimestampsMapper.update(postId);
    }
}
