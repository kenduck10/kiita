package com.kenduck.common.user.services;

import com.kenduck.common.user.dtos.UpdateUser;
import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdateUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void updateUser(UpdateUser updateUser) {
        User user = new User(updateUser);
        userMapper.updateByPrimaryKey(user);
    }
}
