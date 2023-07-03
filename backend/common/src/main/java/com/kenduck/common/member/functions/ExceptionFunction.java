package com.kenduck.common.member.functions;

import com.kenduck.common.member.exceptions.MemberNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.util.function.Supplier;

@Slf4j
public class ExceptionFunction {


    public static Supplier<MemberNotFoundException> memberNotFoundSupplier(int memberId) {
        return () -> {
            String message = String.format("target member (id=%d) is not found", memberId);
            log.warn(message);
            return new MemberNotFoundException(memberId, message);
        };
    }
}
