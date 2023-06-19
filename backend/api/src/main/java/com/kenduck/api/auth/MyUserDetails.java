package com.kenduck.api.auth;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.MemberPassword;
import lombok.Getter;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

/**
 * 認証後のユーザー情報
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
