package com.kenduck.common.member.models;


import com.kenduck.common.generated.models.GeneratedMember;
import com.kenduck.common.member.dtos.CreateMember;

/**
 * membersテーブルのモデル
 */
public class Member extends GeneratedMember {

    public static final int MAX_NAME_LENGTH = 50;

    /**
     * コンストラクタ
     *
     * @param generatedMember membersテーブルの自動生成クラスのインスタンス
     */
    public Member(GeneratedMember generatedMember) {
        super(
                generatedMember.getId(),
                generatedMember.getName(),
                generatedMember.getMailAddress()
        );
    }

    /**
     * コンストラクタ
     *
     * @param createMember 作成するmember
     */
    public Member(CreateMember createMember) {
        super(
                null,
                createMember.getName(),
                createMember.getMailAddress()
        );
    }

}
