package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper extends GeneratedMemberMapper {

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
