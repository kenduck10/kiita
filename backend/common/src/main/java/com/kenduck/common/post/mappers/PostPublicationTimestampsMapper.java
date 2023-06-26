package com.kenduck.common.post.mappers;

import com.kenduck.common.generated.mappers.GeneratedPostPublicationTimestampDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedPostPublicationTimestampMapper;
import com.kenduck.common.generated.models.GeneratedPostPublicationTimestamp;
import com.kenduck.common.post.models.PostPublicationTimestamp;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;
import org.mybatis.dynamic.sql.util.mybatis3.MyBatis3Utils;

import java.util.Optional;

import static com.kenduck.common.generated.mappers.GeneratedPostPublicationTimestampDynamicSqlSupport.generatedPostPublicationTimestamp;
import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
public interface PostPublicationTimestampsMapper extends GeneratedPostPublicationTimestampMapper {

    default int deleteByPostId(int postId) {
        return delete(c ->
                c.where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isEqualTo(postId))
        );
    }

    default Optional<PostPublicationTimestamp> selectByPostId(int postId) {
        SelectDSLCompleter completer = select ->
                select
                        .where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isEqualTo(postId));
        Optional<GeneratedPostPublicationTimestamp> generatedPostPublicationTimestampOptional = selectOne(completer);
        return generatedPostPublicationTimestampOptional.map(PostPublicationTimestamp::new);
    }

    default int insert(int postId) {
        GeneratedPostPublicationTimestamp timestamp = new GeneratedPostPublicationTimestamp(
                null,
                postId,
                null,
                null
        );
        return this.insertSelective(timestamp);
    }

    default int update(int targetPostId) {
        return MyBatis3Utils.update(this::update, generatedPostPublicationTimestamp, c ->
                c.set(GeneratedPostPublicationTimestampDynamicSqlSupport.postId).equalTo(targetPostId)
                        .where(GeneratedPostPublicationTimestampDynamicSqlSupport.postId, isEqualTo(targetPostId))
        );
    }
}
