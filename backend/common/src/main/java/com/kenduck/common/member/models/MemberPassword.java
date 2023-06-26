package com.kenduck.common.member.models;


import com.kenduck.common.generated.models.GeneratedMemberPassword;

/**
 * member_passwordsテーブルのモデル
 */
public class MemberPassword extends GeneratedMemberPassword {

    /**
     * コンストラクタ
     *
     * @param generatedMemberPassword member_passwordsの自動生成クラスのインスタンス
     */
    public MemberPassword(GeneratedMemberPassword generatedMemberPassword) {
        super(
                generatedMemberPassword.getMemberId(),
                generatedMemberPassword.getPassword()
        );
    }
}
