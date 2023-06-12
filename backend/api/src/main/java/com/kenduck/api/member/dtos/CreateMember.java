package com.kenduck.api.member.dtos;

import com.kenduck.api.member.requests.CreateMemberRequest;

public class CreateMember extends com.kenduck.common.member.dtos.CreateMember {
    public CreateMember(CreateMemberRequest request) {
        super(
                request.getName(),
                request.getMailAddress(),
                request.getPassword()
        );
    }
}
