package com.kenduck.common.user.dtos;

import com.kenduck.common.user.models.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundUser {

    private final String lastName;

    private final String firstName;

    public FoundUser(User user) {
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
    }
}
