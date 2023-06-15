package com.kenduck.common.member.exceptions;


import lombok.Getter;

@Getter
public class MemberPasswordNotFoundException extends RuntimeException {

    private final int memberId;

    public MemberPasswordNotFoundException(int memberId, String message) {
        super(message);
        this.memberId = memberId;
    }
}
