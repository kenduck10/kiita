package com.kenduck.api.auth;

import lombok.Data;

@Data
public class LoginForm {
    private String name;
    private String password;
}
