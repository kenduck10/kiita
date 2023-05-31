package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.CreatePost;
import com.kenduck.common.post.mappers.PostMapper;
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

    @Transactional
    public int createPost(CreatePost createPost) {
        Post post = new Post(createPost);
        postMapper.insert(post);
        return post.getId();
    }
}
