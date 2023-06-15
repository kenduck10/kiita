package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedMemberMapper;
import com.kenduck.common.member.models.Member;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
public interface MemberMapper extends GeneratedMemberMapper {

//    default Optional<Post> selectByPrimaryKey(int id) {
//        Optional<GeneratedPost> generatedUserOptional =
//                GeneratedPostMapper.super.selectByPrimaryKey(id);
//        return generatedUserOptional.map(Post::new);
//    }

    default Optional<Member> selectByName(String name) {
        SelectDSLCompleter completer = select ->
                select.where(GeneratedMemberDynamicSqlSupport.name, isEqualTo(name));
        return selectOne(completer).map(Member::new);
    }

//    default Posts selectAll() {
//        SelectDSLCompleter completer = select ->
//                select.orderBy(GeneratedPostDynamicSqlSupport.id.descending());
//        return new Posts(select(completer));
//    }
}
