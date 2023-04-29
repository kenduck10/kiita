package com.kenduck.common.user.services;

import com.kenduck.common.user.dtos.CreateUser;
import com.kenduck.common.user.dtos.CreatedUser;
import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public CreatedUser createUser(CreateUser createUser) {
        User user = new User(createUser);
        userMapper.insert(user);
        return new CreatedUser(user);
    }
}
