package com.kenduck.common.user.mappers;

import com.kenduck.common.generated.mappers.GeneratedUserDynamicSqlSupport;
import com.kenduck.common.generated.mappers.GeneratedUserMapper;
import com.kenduck.common.generated.models.GeneratedUser;
import com.kenduck.common.user.models.User;
import com.kenduck.common.user.models.Users;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.dynamic.sql.select.SelectDSLCompleter;

import java.util.Optional;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
public interface UserMapper extends GeneratedUserMapper {

    default Optional<User> selectById(int id) {
        SelectDSLCompleter completer = select ->
                select.where(GeneratedUserDynamicSqlSupport.id, isEqualTo(id));
        return selectOne(completer).map(User::new);
    }

    default Optional<User> selectByPrimaryKey(int id) {
        Optional<GeneratedUser> generatedUserOptional =
                GeneratedUserMapper.super.selectByPrimaryKey(id);
        return generatedUserOptional.map(User::new);
    }

    default Users selectAll() {
        SelectDSLCompleter completer = select ->
                select.orderBy(GeneratedUserDynamicSqlSupport.id);
        return new Users(select(completer));
    }
}
