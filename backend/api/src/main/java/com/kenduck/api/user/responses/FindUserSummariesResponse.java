package com.kenduck.api.user.responses;

import com.kenduck.common.user.dtos.FoundUserSummaries;
import com.kenduck.common.user.dtos.FoundUserSummary;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
public class FindUserSummariesResponse {

    private final List<User> users;

    public FindUserSummariesResponse(FoundUserSummaries foundUserSummaries) {
        this.users = foundUserSummaries
                .getValue()
                .stream()
                .map(User::new)
                .toList();
    }

    @Getter
    @ToString
    @EqualsAndHashCode
    private static class User {

        private final int userId;

        private final String lastName;

        private final String firstName;

        private final String mailAddress;

        private User(FoundUserSummary foundUserSummary) {
            this.userId = foundUserSummary.getUserId();
            this.lastName = foundUserSummary.getLastName();
            this.firstName = foundUserSummary.getFirstName();
            this.mailAddress = foundUserSummary.getMailAddress();
        }
    }
}
