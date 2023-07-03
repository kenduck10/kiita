package com.kenduck.api.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

/**
 * APIリクエストをしたログインユーザーの情報
 * JWTのclaimにJSON形式で書き込まれる
 */
@Getter
public class LoginMember {

    private final Integer id;

    private final String name;

    private final String mailAddress;

    /**
     * claim書き込みの際に利用するコンストラクタ
     *
     * @param myUserDetails {@link MyUserDetails}
     */
    public LoginMember(MyUserDetails myUserDetails) {
        this.id = myUserDetails.getMember().getId();
        this.name = myUserDetails.getMember().getName();
        this.mailAddress = myUserDetails.getMember().getMailAddress();
    }

    /**
     * JSONからデシリアライズする際に利用するコンストラクタ
     *
     * @param id          メンバーID
     * @param name        名前
     * @param mailAddress メールアドレス
     */
    @JsonCreator
    public LoginMember(
            @JsonProperty("id")
            int id,
            @JsonProperty("name")
            String name,
            @JsonProperty("mailAddress")
            String mailAddress
    ) {
        this.id = id;
        this.name = name;
        this.mailAddress = mailAddress;
    }
}
