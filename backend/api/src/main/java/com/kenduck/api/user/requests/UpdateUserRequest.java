package com.kenduck.api.user.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import static com.kenduck.common.user.models.User.MAX_FIRST_NAME_LENGTH;
import static com.kenduck.common.user.models.User.MAX_LAST_NAME_LENGTH;

@Data
public class UpdateUserRequest {

    @Length(max = MAX_LAST_NAME_LENGTH)
    @NotBlank
    private String lastName;

    @Length(max = MAX_FIRST_NAME_LENGTH)
    @NotBlank
    private String firstName;

    @NotBlank
    @Email
    private String mailAddress;
}
