package com.kenduck.api.user.responses;

import com.kenduck.common.user.dtos.FoundUserSummaries;
import com.kenduck.common.user.dtos.FoundUserSummary;
import lombok.Getter;

import java.util.List;

@Getter
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
