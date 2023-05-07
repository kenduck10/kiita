package com.kenduck.common.user.services;

import com.kenduck.common.email.exceptions.DuplicatedMailAddressException;
import com.kenduck.common.user.dtos.CreateUser;
import com.kenduck.common.user.dtos.CreatedUser;
import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public CreatedUser createUser(CreateUser createUser) {
        String mailAddress = createUser.getMailAddress();
        userMapper.selectByMailAddress(mailAddress)
                .ifPresent((user) -> {
                    String message = String.format("%s is already used. user mail address needs to be unique.", mailAddress);
                    log.warn(message);
                    throw new DuplicatedMailAddressException(mailAddress, message);
                });
        User user = new User(createUser);
        userMapper.insert(user);
        return new CreatedUser(user);
    }
}
