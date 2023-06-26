package com.kenduck.api.member.dtos;

import com.kenduck.api.member.requests.CreateMemberRequest;

/**
 * 登録する会員
 */
public class CreateMember extends com.kenduck.common.member.dtos.CreateMember {
    public CreateMember(CreateMemberRequest request) {
        super(
                request.getName(),
                request.getMailAddress(),
                request.getPassword()
        );
    }
}
