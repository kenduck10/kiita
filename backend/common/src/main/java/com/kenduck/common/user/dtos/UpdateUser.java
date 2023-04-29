package com.kenduck.common.user.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class UpdateUser {

    private final int userId;

    private final String lastName;

    private final String firstName;
}
