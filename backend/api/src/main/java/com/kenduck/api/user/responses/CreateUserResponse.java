package com.kenduck.api.user.responses;

import com.kenduck.common.user.dtos.CreatedUser;
import lombok.Getter;

@Getter
public class CreateUserResponse {

    private final int userId;

    private final String lastName;

    private final String firstName;

    private final String mailAddress;

    public CreateUserResponse(CreatedUser createdUser) {
        this.userId = createdUser.getUserId();
        this.lastName = createdUser.getLastName();
        this.firstName = createdUser.getFirstName();
        this.mailAddress = createdUser.getMailAddress();
    }
}
