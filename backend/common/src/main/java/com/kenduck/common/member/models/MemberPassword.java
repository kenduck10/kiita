package com.kenduck.common.member.models;


import com.kenduck.common.generated.models.GeneratedMemberPassword;

public class MemberPassword extends GeneratedMemberPassword {

    public MemberPassword(Member member, String encodedPassword) {
        super(
                member.getId(),
                encodedPassword
        );
    }
}
