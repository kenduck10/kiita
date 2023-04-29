package com.kenduck.common.user.dtos;

import com.kenduck.common.user.models.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class CreatedUser {

    private final int userId;
    private final String lastName;
    private final String firstName;

    public CreatedUser(User user) {
        this.userId= user.getId();
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
    }
}
