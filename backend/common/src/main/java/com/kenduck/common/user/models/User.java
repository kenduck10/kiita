package com.kenduck.common.user.models;


import com.kenduck.common.user.dtos.CreateUser;
import com.kenduck.common.user.dtos.UpdateUser;
import com.kenduck.common.generated.models.GeneratedUser;

public class User extends GeneratedUser{

    public static final int MAX_LAST_NAME_LENGTH = 50;
    public static final int MAX_FIRST_NAME_LENGTH = 50;

    public User(GeneratedUser generatedUser) {
        super(
                generatedUser.getId(),
                generatedUser.getLastName(),
                generatedUser.getFirstName()
        );
    }

    public User(CreateUser createUser) {
        super(
                null,
                createUser.getLastName(),
                createUser.getFirstName()
        );
    }

    public User(UpdateUser updateUser) {
        super(
                updateUser.getUserId(),
                updateUser.getLastName(),
                updateUser.getFirstName()
        );
    }
}
