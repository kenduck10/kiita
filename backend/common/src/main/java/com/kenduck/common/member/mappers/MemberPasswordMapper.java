package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberPasswordMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberPasswordMapper extends GeneratedMemberPasswordMapper {

//    default Optional<Post> selectByPrimaryKey(int id) {
//        Optional<GeneratedPost> generatedUserOptional =
//                GeneratedPostMapper.super.selectByPrimaryKey(id);
//        return generatedUserOptional.map(Post::new);
//    }

//    default Posts selectAll() {
//        SelectDSLCompleter completer = select ->
//                select.orderBy(GeneratedPostDynamicSqlSupport.id.descending());
//        return new Posts(select(completer));
//    }
}
