package com.kenduck.common.user.services;

import com.kenduck.common.user.exceptions.UserNotFoundException;
import com.kenduck.common.user.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void deleteUser(int userId) {
        userMapper.selectById(userId).orElseThrow(
                () -> {
                    String message = String.format("target user (id=%d) is not found", userId);
                    log.warn(message);
                    return new UserNotFoundException(userId, message);
                }
        );
        userMapper.deleteByPrimaryKey(userId);
    }
}
