package com.kenduck.common.member.mappers;

import com.kenduck.common.generated.mappers.GeneratedMemberPasswordMapper;
import com.kenduck.common.generated.models.GeneratedMemberPassword;
import com.kenduck.common.member.models.MemberPassword;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

/**
 * {@link MemberPassword}マッパー
 */
@Mapper
public interface MemberPasswordMapper extends GeneratedMemberPasswordMapper {

    /**
     * 指定した会員IDのパスワードを取得
     *
     * @param memberId 会員ID
     * @return パスワード
     */
    default Optional<MemberPassword> selectByPrimaryKey(int memberId) {
        Optional<GeneratedMemberPassword> generatedMemberPasswordOptional =
                GeneratedMemberPasswordMapper.super.selectByPrimaryKey(memberId);
        return generatedMemberPasswordOptional.map(MemberPassword::new);
    }

}
