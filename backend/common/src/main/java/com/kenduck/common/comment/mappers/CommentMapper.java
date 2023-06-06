package com.kenduck.common.comment.mappers;

import com.kenduck.common.comment.models.Comment;
import com.kenduck.common.comment.models.Comments;
import com.kenduck.common.generated.mappers.GeneratedCommentDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedCommentMapper;
import com.kenduck.common.generated.models.GeneratedComment;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
public interface CommentMapper extends GeneratedCommentMapper {

    default Optional<Comment> selectByPrimaryKey(int id) {
        Optional<GeneratedComment> generatedCommentOptional =
                GeneratedCommentMapper.super.selectByPrimaryKey(id);
        return generatedCommentOptional.map(Comment::new);
    }

    default Comments selectByPostId(int postId) {
        SelectDSLCompleter completer = select ->
                select
                        .where(GeneratedCommentDynamicSqlSupport.postId, isEqualTo(postId))
                        .orderBy(GeneratedCommentDynamicSqlSupport.commentedAt);
        return new Comments(select(completer));
    }
}
