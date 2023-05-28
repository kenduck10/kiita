package com.kenduck.common.post.mappers;

import com.kenduck.common.generated.mappers.GeneratedPostDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedPostMapper;
import com.kenduck.common.post.models.Posts;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

@Mapper
public interface PostMapper extends GeneratedPostMapper {


    default Posts selectAll() {
        SelectDSLCompleter completer = select ->
                select.orderBy(GeneratedPostDynamicSqlSupport.id.descending());
        return new Posts(select(completer));
    }
}
