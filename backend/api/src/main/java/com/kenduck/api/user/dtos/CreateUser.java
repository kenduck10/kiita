package com.kenduck.api.user.dtos;

import com.kenduck.api.user.requests.CreateUserRequest;

public class CreateUser extends com.kenduck.common.user.dtos.CreateUser {
    public CreateUser(CreateUserRequest request) {
        super(
                request.getLastName(),
                request.getFirstName(),
                request.getMailAddress()
        );
    }
}
