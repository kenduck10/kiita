package com.kenduck.common.user.exceptions;


import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException {

    private final int userId;

    public UserNotFoundException(int userId, String message) {
        super(message);
        this.userId = userId;
    }
}
