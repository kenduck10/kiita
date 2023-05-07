package com.kenduck.common.user.services;

import com.kenduck.common.user.dtos.FoundUser;
import com.kenduck.common.user.dtos.FoundUserSummaries;
import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import com.kenduck.common.user.models.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.kenduck.common.user.functions.ExceptionFunction.userNotFoundSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class FindUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public FoundUser findUserById(int userId) {
        User user = userMapper
                .selectByPrimaryKey(userId)
                .orElseThrow(userNotFoundSupplier(userId));
        return new FoundUser(user);
    }

    @Transactional(readOnly = true)
    public FoundUserSummaries findAllUserSummaries() {
        Users users = userMapper.selectAll();
        return new FoundUserSummaries(users);
    }
}
