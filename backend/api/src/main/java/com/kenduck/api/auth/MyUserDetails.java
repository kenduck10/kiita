package com.kenduck.api.auth;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.MemberPassword;
import lombok.Getter;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

/**
 * 認証時に利用するユーザー情報
 * デシリアライズ簡易化のため、JWTのclaimにはより情報を絞った{@link LoginMember}を詰める
 */
@Getter
public class MyUserDetails extends User {

    private final Member member;

    /**
     * コンストラクタ
     * パスワードは暗号化されたものを保持
     *
     * @param member         {@link Member}
     * @param memberPassword {@link MemberPassword}
     */
    public MyUserDetails(Member member, MemberPassword memberPassword) {
        super(member.getName(), memberPassword.getPassword(), Collections.emptyList());
        this.member = member;
    }
}
