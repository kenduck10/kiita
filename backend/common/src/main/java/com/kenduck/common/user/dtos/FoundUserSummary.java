package com.kenduck.common.user.dtos;

import com.kenduck.common.user.models.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class FoundUserSummary {

    private final int userId;

    private final String lastName;

    private final String firstName;

    private final String mailAddress;

    public FoundUserSummary(User user) {
        this.userId = user.getId();
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
        this.mailAddress = user.getMailAddress();
    }
}
