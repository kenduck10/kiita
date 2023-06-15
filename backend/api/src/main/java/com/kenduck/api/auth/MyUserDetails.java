package com.kenduck.api.auth;

import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.MemberPassword;
import lombok.Getter;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

@Getter
public class MyUserDetails extends User {

    private final Member member;

    public MyUserDetails(Member member, MemberPassword memberPassword) {
        super(member.getName(), memberPassword.getPassword(), Collections.emptyList());
        this.member = member;
    }
}
