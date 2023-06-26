package com.kenduck.api.auth;

import lombok.Data;

/**
 * ログインAPIのリクエストボディマッピング用クラス
 */
@Data
public class LoginRequest {
    private String name;
    private String password;
}
