package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedMemberMapper;
import com.kenduck.common.member.models.Member;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

/**
 * {@link Member}マッパー
 */
@Mapper
public interface MemberMapper extends GeneratedMemberMapper {

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

}
