package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedMemberMapper;
import com.kenduck.common.generated.models.GeneratedMember;
import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.Members;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.List;
import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;
import static org.mybatis.dynamic.sql.SqlBuilder.isIn;

/**
 * {@link Member}マッパー
 */
@Mapper
public interface MemberMapper extends GeneratedMemberMapper {

    /**
     * 指定した会員IDの会員を取得
     *
     * @param id 会員ID
     * @return 会員
     */
    default Optional<Member> selectByPrimaryKey(int id) {
        Optional<GeneratedMember> generatedMemberOptional =
                GeneratedMemberMapper.super.selectByPrimaryKey(id);
        return generatedMemberOptional.map(Member::new);
    }

    /**
     * 指定した名前の会員を取得
     *
     * @param name 名前
     * @return 会員
     */
    default Optional<Member> selectByName(String name) {
        SelectDSLCompleter completer = select ->
                select.where(GeneratedMemberDynamicSqlSupport.name, isEqualTo(name));
        return selectOne(completer).map(Member::new);
    }

    default Members selectByIds(List<Integer> ids) {
        SelectDSLCompleter completer = select ->
                select.where(GeneratedMemberDynamicSqlSupport.id, isIn(ids));
        return new Members(select(completer));
    }
}
