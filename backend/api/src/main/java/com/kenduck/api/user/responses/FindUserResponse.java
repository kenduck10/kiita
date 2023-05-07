package com.kenduck.api.user.responses;

import com.kenduck.common.user.dtos.FoundUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class FindUserResponse {

    private final String lastName;

    private final String firstName;

    private final String mailAddress;

    public FindUserResponse(FoundUser foundUser) {
        this.lastName = foundUser.getLastName();
        this.firstName = foundUser.getFirstName();
        this.mailAddress = foundUser.getMailAddress();
    }
}
