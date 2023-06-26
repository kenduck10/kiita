package com.kenduck.common.post.services;

import com.kenduck.common.member.mappers.MemberMapper;
import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.Members;
import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.mappers.PostMapper;
import com.kenduck.common.post.mappers.PostPublicationTimestampsMapper;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import com.kenduck.common.post.models.PostPublicationTimestamps;
import com.kenduck.common.post.models.Posts;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.kenduck.common.post.functions.ExceptionFunction.postNotFoundSupplier;

@Service
@RequiredArgsConstructor
public class FindPostService {

    @NonNull
    private final PostMapper postMapper;

    @NonNull
    private final MemberMapper memberMapper;

    @NonNull
    private final PostPublicationTimestampsMapper postPublicationTimestampsMapper;

    @Transactional(readOnly = true)
    public FoundPost findPostById(int postId) {
        Post post = postMapper
                .selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));

        PostPublicationTimestamp timestamp = postPublicationTimestampsMapper
                .selectByPostId(postId)
                .orElseThrow(postNotFoundSupplier(postId));

        int authorId = post.getAuthorId();
        Member author = memberMapper
                .selectByPrimaryKey(authorId)
                .orElseThrow(() -> new IllegalStateException("no author post is found (postId = " + postId + ")."));

        return new FoundPost(post, author, timestamp);
    }

    @Transactional(readOnly = true)
    public FoundPostSummaries findPostSummaries() {
        Posts posts = postMapper.selectPublished();

        List<Integer> authorIds = posts.getAuthorIds();
        Members authors = memberMapper.selectByIds(authorIds);

        List<Integer> postIds = posts.getIds();
        PostPublicationTimestamps timestamps =
                postPublicationTimestampsMapper.selectByPostIds(postIds);

        return new FoundPostSummaries(posts, authors, timestamps);
    }
}
