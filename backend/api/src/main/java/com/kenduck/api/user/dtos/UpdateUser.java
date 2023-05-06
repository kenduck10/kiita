package com.kenduck.api.user.dtos;

import com.kenduck.api.user.requests.UpdateUserRequest;

public class UpdateUser extends com.kenduck.common.user.dtos.UpdateUser {
    public UpdateUser(int userId, UpdateUserRequest request) {
        super(
                userId,
                request.getLastName(),
                request.getFirstName(),
                request.getMailAddress()
        );
    }
}
