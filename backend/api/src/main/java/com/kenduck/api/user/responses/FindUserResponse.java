package com.kenduck.api.user.responses;

import com.kenduck.common.user.dtos.FoundUser;
import lombok.Getter;

@Getter
public class FindUserResponse {

    private final String lastName;

    private final String firstName;

    public FindUserResponse(FoundUser foundUser) {
        this.lastName = foundUser.getLastName();
        this.firstName = foundUser.getFirstName();
    }
}
