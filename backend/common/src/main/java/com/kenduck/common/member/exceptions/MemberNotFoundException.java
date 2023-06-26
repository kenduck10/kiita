package com.kenduck.common.member.exceptions;


import lombok.Getter;

@Getter
public class MemberNotFoundException extends RuntimeException {

    private final int memberId;

    public MemberNotFoundException(int memberId, String message) {
        super(message);
        this.memberId = memberId;
    }
}
