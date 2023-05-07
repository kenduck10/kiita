package com.kenduck.common.user.models;


import com.kenduck.common.generated.models.GeneratedUser;
import com.kenduck.common.user.dtos.CreateUser;
import com.kenduck.common.user.dtos.UpdateUser;

import java.util.Objects;

public class User extends GeneratedUser {

    public static final int MAX_LAST_NAME_LENGTH = 50;
    public static final int MAX_FIRST_NAME_LENGTH = 50;

    public User(GeneratedUser generatedUser) {
        super(
                generatedUser.getId(),
                generatedUser.getLastName(),
                generatedUser.getFirstName(),
                generatedUser.getMailAddress()
        );
    }

    public User(CreateUser createUser) {
        super(
                null,
                createUser.getLastName(),
                createUser.getFirstName(),
                createUser.getMailAddress()
        );
    }

    public User(UpdateUser updateUser) {
        super(
                updateUser.getUserId(),
                updateUser.getLastName(),
                updateUser.getFirstName(),
                updateUser.getMailAddress()
        );
    }

    public boolean hasId(int id) {
        return Objects.nonNull(this.getId()) && this.getId().equals(id);
    }
}
