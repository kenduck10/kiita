package com.kenduck.common.user.services;

import com.kenduck.common.user.dtos.UpdateUser;
import com.kenduck.common.user.functions.ExceptionFunction;
import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Consumer;

import static com.kenduck.common.user.functions.ExceptionFunction.userNotFoundSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateUserService {

    @NonNull
    private final UserMapper userMapper;

    @Transactional
    public void updateUser(UpdateUser updateUser) {
        int userId = updateUser.getUserId();
        userMapper.selectById(userId)
                .orElseThrow(userNotFoundSupplier(userId));
        String mailAddress = updateUser.getMailAddress();
        userMapper.selectByMailAddress(mailAddress)
                .ifPresent(duplicatedMailAddressConsumer(userId));
        User user = new User(updateUser);
        userMapper.updateByPrimaryKey(user);
    }

    private Consumer<User> duplicatedMailAddressConsumer(int userId) {
        return (user) -> {
            boolean isTargetUser = user.hasId(userId);
            if (!isTargetUser) {
                ExceptionFunction
                        .duplicatedMailAddressConsumer()
                        .accept(user);
            }
        };
    }
}
