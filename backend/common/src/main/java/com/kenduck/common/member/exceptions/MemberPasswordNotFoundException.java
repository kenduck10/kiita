package com.kenduck.common.member.exceptions;

import com.kenduck.common.member.models.MemberPassword;
import lombok.Getter;

/**
 * {@link MemberPassword}なし例外
 */
@Getter
public class MemberPasswordNotFoundException extends RuntimeException {

    private final int memberId;

    /**
     * コンストラクタ
     *
     * @param memberId 会員ID
     * @param message  メッセージ
     */
    public MemberPasswordNotFoundException(int memberId, String message) {
        super(message);
        this.memberId = memberId;
    }
}
