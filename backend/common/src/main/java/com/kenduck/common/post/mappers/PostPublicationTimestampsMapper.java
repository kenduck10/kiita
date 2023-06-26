package com.kenduck.common.post.mappers;

import com.kenduck.common.generated.mappers.GeneratedPostPublicationTimestampDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedPostPublicationTimestampMapper;
import com.kenduck.common.generated.models.GeneratedPostPublicationTimestamp;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import com.kenduck.common.post.models.PostPublicationTimestamps;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.kenduck.common.post.functions.ExceptionFunction.postPublicationTimestampNotFoundExceptionSupplier;
import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;
import static org.mybatis.dynamic.sql.SqlBuilder.isIn;

@Mapper
public interface PostPublicationTimestampsMapper extends GeneratedPostPublicationTimestampMapper {

    default int deleteByPostId(int postId) {
        return delete(c ->
                c.where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isEqualTo(postId))
        );
    }

    default PostPublicationTimestamps selectByPostIds(List<Integer> postIds) {
        SelectDSLCompleter completer = select ->
                select
                        .where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isIn(postIds));
        return new PostPublicationTimestamps(select(completer));
    }

    default Optional<PostPublicationTimestamp> selectByPostId(int postId) {
        SelectDSLCompleter completer = select ->
                select
                        .where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isEqualTo(postId));
        Optional<GeneratedPostPublicationTimestamp> generatedPostPublicationTimestampOptional = selectOne(completer);
        return generatedPostPublicationTimestampOptional.map(PostPublicationTimestamp::new);
    }

    default int publishForTheFirstTime(int postId) {
        GeneratedPostPublicationTimestamp timestamp = new GeneratedPostPublicationTimestamp(
                null,
                postId,
                null,
                null
        );
        return this.insertSelective(timestamp);
    }

    default int publishAgain(int postId) {
        LocalDateTime firstPublishedAt = this.selectByPostId(postId)
                .orElseThrow(postPublicationTimestampNotFoundExceptionSupplier(postId))
                .getFirstPublishedAt();

        GeneratedPostPublicationTimestamp timestamp = new GeneratedPostPublicationTimestamp(
                null,
                postId,
                firstPublishedAt,
                null
        );

        this.deleteByPostId(postId);
        return this.insertSelective(timestamp);
    }
}
