package com.kenduck.common.member.models;


import com.kenduck.common.generated.models.GeneratedMember;
import lombok.Getter;

import java.util.List;
import java.util.Optional;

@Getter
public class Members {

    private final List<Member> value;

    public Members(List<GeneratedMember> generatedMembers) {
        this.value = generatedMembers
                .stream()
                .map(Member::new)
                .toList();
    }

    public Optional<Member> findFirstByMemberId(int memberId) {
        return this.value
                .stream()
                .filter((member) -> member.getId().equals(memberId))
                .findFirst();
    }
}
