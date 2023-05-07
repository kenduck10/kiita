package com.kenduck.common.user.services;

import com.kenduck.common.user.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.user.functions.ExceptionFunction.userNotFoundSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void deleteUser(int userId) {
        userMapper.selectById(userId)
                .orElseThrow(userNotFoundSupplier(userId));
        userMapper.deleteByPrimaryKey(userId);
    }
}
