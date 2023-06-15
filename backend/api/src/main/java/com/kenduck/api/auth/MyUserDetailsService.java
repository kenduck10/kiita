package com.kenduck.api.auth;

import com.kenduck.common.member.exceptions.MemberPasswordNotFoundException;
import com.kenduck.common.member.mappers.MemberMapper;
import com.kenduck.common.member.mappers.MemberPasswordMapper;
import com.kenduck.common.member.models.Member;
import com.kenduck.common.member.models.MemberPassword;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    @NonNull
    private final MemberMapper memberMapper;

    @NonNull
    private final MemberPasswordMapper memberPasswordMapper;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Member member = memberMapper.selectByName(name)
                .orElseThrow(() -> new UsernameNotFoundException("member not found (name = " + name + ")"));
        int memberId = member.getId();
        MemberPassword memberPassword = memberPasswordMapper.selectByPrimaryKey(memberId)
                .orElseThrow(() -> new MemberPasswordNotFoundException(memberId, "member password not found (memberId = " + memberId + ")"));
        return new MyUserDetails(member, memberPassword);
    }
}
