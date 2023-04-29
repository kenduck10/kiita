package com.kenduck.common.user.models;


import com.kenduck.common.generated.models.GeneratedUser;
import lombok.Getter;

import java.util.List;

@Getter
public class Users {

    private final List<User> value;

    public Users(List<GeneratedUser> generatedUsers) {
        this.value = generatedUsers
                .stream()
                .map(User::new)
                .toList();
    }
}
