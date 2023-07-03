package com.kenduck.common.comment.services;

import com.kenduck.common.comment.dtos.FoundComments;
import com.kenduck.common.comment.mappers.CommentMapper;
import com.kenduck.common.comment.models.Comments;
import com.kenduck.common.member.mappers.MemberMapper;
import com.kenduck.common.member.models.Members;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindCommentService {

    @NonNull
    private final CommentMapper commentMapper;

    @NonNull
    private final MemberMapper memberMapper;

    @Transactional(readOnly = true)
    public FoundComments findCommentsByPostId(int postId) {
        Comments comments = commentMapper.selectByPostId(postId);
        List<Integer> commenterIds = comments.getCommenterIds();
        Members commenters = memberMapper.selectByIds(commenterIds);
        return new FoundComments(comments, commenters);
    }
}
