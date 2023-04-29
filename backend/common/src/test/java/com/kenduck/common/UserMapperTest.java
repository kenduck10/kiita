package com.kenduck.common;

import com.kenduck.common.user.mappers.UserMapper;
import com.kenduck.common.user.models.User;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Nested
    @Sql("classpath:db/UserMapper/SelectById.sql")
    class SelectById {
        @Test
        void existsTargetRecord() {
            User selectedUser= userMapper
                    .selectById(1).get();
            assertThat(selectedUser.getId()).isEqualTo(1);
        }
    }
}
