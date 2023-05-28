package com.kenduck.common.post.services;

import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.models.Posts;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FindPostService {

    @NonNull
    private final PostMapper postMapper;

    @Transactional(readOnly = true)
    public FoundPostSummaries findPostSummaries() {
        Posts posts = postMapper.selectAll();
        return new FoundPostSummaries(posts);
    }
}
