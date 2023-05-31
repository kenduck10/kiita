package com.kenduck.common.post.functions;

import com.kenduck.common.post.exceptions.PostNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.util.function.Supplier;

@Slf4j
public class ExceptionFunction {

//    public static Consumer<User> duplicatedMailAddressConsumer() {
//        return (user) -> {
//            String mailAddress = user.getMailAddress();
//            String message = String.format("%s is already used. user mail address needs to be unique.", mailAddress);
//            log.warn(message);
//            throw new DuplicatedMailAddressException(mailAddress, message);
//        };
//    }

    public static Supplier<PostNotFoundException> postNotFoundSupplier(int postId) {
        return () -> {
            String message = String.format("target post (id=%d) is not found", postId);
            log.warn(message);
            return new PostNotFoundException(postId, message);
        };
    }
}
