package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.CreatePost;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.mappers.PostPublicationTimestampsMapper;
import com.kenduck.common.post.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreatePostService {

    @NonNull
    private final PostMapper postMapper;

    @NonNull
    private final PostPublicationTimestampsMapper postPublicationTimestampsMapper;

    @Transactional
    public int createPost(CreatePost createPost) {
        Post post = new Post(createPost);
        postMapper.insert(post);
        int postId = post.getId();
        if (!createPost.isDraft()) {
            postPublicationTimestampsMapper.insert(postId);
        }
        return postId;
    }
}
