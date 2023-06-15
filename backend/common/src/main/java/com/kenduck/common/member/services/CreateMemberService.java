package com.kenduck.common.member.services;

import com.kenduck.common.member.dtos.CreateMember;
import com.kenduck.common.member.mappers.MemberMapper;
import com.kenduck.common.member.mappers.MemberPasswordMapper;
import com.kenduck.common.member.models.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateMemberService {

    @NonNull
    private final MemberMapper memberMapper;

    @NonNull
    private final MemberPasswordMapper memberPasswordMapper;

//    @NonNull
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public int createMember(CreateMember createMember) {
        Member member = new Member(createMember);
        memberMapper.insert(member);
//        MemberPassword memberPassword = new MemberPassword(
//                member,
//                bCryptPasswordEncoder.encode(createMember.getPassword())
//        );
//        memberPasswordMapper.insert(memberPassword);
        return member.getId();
    }
}
