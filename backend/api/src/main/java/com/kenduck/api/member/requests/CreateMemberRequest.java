package com.kenduck.api.member.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import static com.kenduck.common.member.models.Member.MAX_NAME_LENGTH;

/**
 * 登録する会員
 */
@Data
public class CreateMemberRequest {

    @Length(max = MAX_NAME_LENGTH)
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String mailAddress;

    @NotBlank
    private String password;

}
