package com.kenduck.common.user.services;

import com.kenduck.common.email.exceptions.DuplicatedMailAddressException;
import com.kenduck.common.user.dtos.UpdateUser;
import com.kenduck.common.user.exceptions.UserNotFoundException;
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
        int userId = updateUser.getUserId();
        userMapper.selectById(userId).orElseThrow(
                () -> new UserNotFoundException(userId, "target user is not found.")
        );
        String mailAddress = updateUser.getMailAddress();
        userMapper.selectByMailAddress(mailAddress)
                .ifPresent((user) -> {
                    throw new DuplicatedMailAddressException(mailAddress, "user mail address needs to be unique.");
                });
        User user = new User(updateUser);
        userMapper.updateByPrimaryKey(user);
    }
}
