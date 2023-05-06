package com.kenduck.common.user.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class CreateUser {

    private final String lastName;

    private final String firstName;

    private final String mailAddress;
}
