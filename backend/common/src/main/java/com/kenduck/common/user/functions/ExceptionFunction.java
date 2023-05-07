package com.kenduck.common.user.functions;

import com.kenduck.common.email.exceptions.DuplicatedMailAddressException;
import com.kenduck.common.user.exceptions.UserNotFoundException;
import com.kenduck.common.user.models.User;
import lombok.extern.slf4j.Slf4j;

import java.util.function.Consumer;
import java.util.function.Supplier;

@Slf4j
public class ExceptionFunction {

    public static Consumer<User> duplicatedMailAddressConsumer() {
        return (user) -> {
            String mailAddress = user.getMailAddress();
            String message = String.format("%s is already used. user mail address needs to be unique.", mailAddress);
            log.warn(message);
            throw new DuplicatedMailAddressException(mailAddress, message);
        };
    }

    public static Supplier<UserNotFoundException> userNotFoundSupplier(int userId) {
        return () -> {
            String message = String.format("target user (id=%d) is not found", userId);
            log.warn(message);
            return new UserNotFoundException(userId, message);
        };
    }
}
