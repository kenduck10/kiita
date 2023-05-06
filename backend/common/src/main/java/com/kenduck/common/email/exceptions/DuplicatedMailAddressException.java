package com.kenduck.common.email.exceptions;


import lombok.Getter;

@Getter
public class DuplicatedMailAddressException extends RuntimeException {

    private final String mailAddress;

    public DuplicatedMailAddressException(String mailAddress, String message) {
        super(message);
        this.mailAddress = mailAddress;
    }
}
