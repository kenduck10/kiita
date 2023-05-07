package com.kenduck.common.user.services;

import com.kenduck.common.email.exceptions.DuplicatedMailAddressException;
import com.kenduck.common.user.dtos.UpdateUser;
import com.kenduck.common.user.exceptions.UserNotFoundException;
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
public class UpdateUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void updateUser(UpdateUser updateUser) {
        int userId = updateUser.getUserId();
        userMapper.selectById(userId).orElseThrow(
                () -> {
                    String message = String.format("target user (id=%d) is not found", userId);
                    log.warn(message);
                    return new UserNotFoundException(userId, message);
                }
        );
        String mailAddress = updateUser.getMailAddress();
        userMapper.selectByMailAddress(mailAddress)
                .ifPresent((user) -> {
                    if (!user.getId().equals(userId)) {
                        String message = String.format("%s is already used. user mail address needs to be unique.", mailAddress);
                        log.warn(message);
                        throw new DuplicatedMailAddressException(mailAddress, message);
                    }
                });
        User user = new User(updateUser);
        userMapper.updateByPrimaryKey(user);
    }
}
