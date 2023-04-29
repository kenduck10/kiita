package com.kenduck.common.user.dtos;

import com.kenduck.common.user.models.Users;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@EqualsAndHashCode
public class FoundUserSummaries {

    private final List<FoundUserSummary> value;

    public FoundUserSummaries(Users users) {
        this.value = users
                .getValue()
                .stream()
                .map(FoundUserSummary::new)
                .toList();
    }
}
