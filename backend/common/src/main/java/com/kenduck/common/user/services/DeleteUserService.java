package com.kenduck.common.user.services;

import com.kenduck.common.user.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeleteUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void deleteUser(int userId) {
        userMapper.deleteByPrimaryKey(userId);
    }
}
