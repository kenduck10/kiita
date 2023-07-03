package com.kenduck.common.post.mappers;

import com.kenduck.common.generated.mappers.GeneratedPostDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedPostMapper;
import com.kenduck.common.generated.models.GeneratedPost;
import com.kenduck.common.post.models.Post;
import com.kenduck.common.post.models.Posts;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
public interface PostMapper extends GeneratedPostMapper {

    default Optional<Post> selectByPrimaryKey(int id) {
        Optional<GeneratedPost> generatedUserOptional =
                GeneratedPostMapper.super.selectByPrimaryKey(id);
        return generatedUserOptional.map(Post::new);
    }

    default Posts selectAll() {
        SelectDSLCompleter completer = select ->
                select.orderBy(GeneratedPostDynamicSqlSupport.id.descending());
        return new Posts(select(completer));
    }

    default Posts selectPublished() {
        SelectDSLCompleter completer = select ->
                select
                        .where(GeneratedPostDynamicSqlSupport.isDraft, isEqualTo(false))
                        .orderBy(GeneratedPostDynamicSqlSupport.id.descending());
        return new Posts(select(completer));
    }
}
