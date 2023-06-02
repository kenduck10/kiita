package com.kenduck.common.post.services;

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

    @Transactional
    public void deletePost(int postId) {
        postMapper.selectByPrimaryKey(postId)
                .orElseThrow(postNotFoundSupplier(postId));
        postMapper.deleteByPrimaryKey(postId);
    }
}
