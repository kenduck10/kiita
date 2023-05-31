package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.Posts;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.post.functions.ExceptionFunction.postNotFoundSupplier;

@Service
@RequiredArgsConstructor
public class FindPostService {

    @NonNull
    private final PostMapper postMapper;

    @Transactional(readOnly = true)
    public FoundPost findPostById(int postId) {
        Post post = postMapper
                .selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        return new FoundPost(post);
    }

    @Transactional(readOnly = true)
    public FoundPostSummaries findPostSummaries() {
        Posts posts = postMapper.selectAll();
        return new FoundPostSummaries(posts);
    }
}
