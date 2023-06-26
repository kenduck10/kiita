package com.kenduck.common.member.services;

import com.kenduck.common.member.dtos.CreateMember;
import com.kenduck.common.member.mappers.MemberMapper;
import com.kenduck.common.member.models.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 会員登録サービス
 */
@Service
@RequiredArgsConstructor
public class CreateMemberService {

    @NonNull
    private final MemberMapper memberMapper;

    /**
     * 会員登録
     *
     * @param createMember 登録する会員
     * @return 会員ID
     */
    @Transactional
    public int createMember(CreateMember createMember) {
        Member member = new Member(createMember);
        memberMapper.insert(member);
        return member.getId();
    }
}
