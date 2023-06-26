package com.kenduck.common.member.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 作成する会員
 */
@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class CreateMember {

    private final String name;

    private final String mailAddress;

    private final String password;
}
