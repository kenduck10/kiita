package com.kenduck.api.auth;

import lombok.Data;

/**
 * ログインAPIのリクエストボディマッピング用クラス
 */
@Data
public class LoginRequestBody {
    private String name;
    private String password;
}
