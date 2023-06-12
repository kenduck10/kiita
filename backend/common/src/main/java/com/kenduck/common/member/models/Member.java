package com.kenduck.common.member.models;


import com.kenduck.common.generated.models.GeneratedMember;
import com.kenduck.common.member.dtos.CreateMember;

public class Member extends GeneratedMember {

    public static final int MAX_NAME_LENGTH = 50;


    public Member(CreateMember createMember) {
        super(
                null,
                createMember.getName(),
                createMember.getMailAddress()
        );
    }

}
