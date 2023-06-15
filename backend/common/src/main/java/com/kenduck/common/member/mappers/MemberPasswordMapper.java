package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberPasswordMapper;
import com.kenduck.common.generated.models.GeneratedMemberPassword;
import com.kenduck.common.member.models.MemberPassword;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberPasswordMapper extends GeneratedMemberPasswordMapper {

    default Optional<MemberPassword> selectByPrimaryKey(int memberId) {
        Optional<GeneratedMemberPassword> generatedMemberPasswordOptional =
                GeneratedMemberPasswordMapper.super.selectByPrimaryKey(memberId);
        return generatedMemberPasswordOptional.map(MemberPassword::new);
    }

//    default Posts selectAll() {
//        SelectDSLCompleter completer = select ->
//                select.orderBy(GeneratedPostDynamicSqlSupport.id.descending());
//        return new Posts(select(completer));
//    }
}
