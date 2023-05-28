package com.kenduck.common.post.dtos;

import com.kenduck.common.post.models.Posts;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@EqualsAndHashCode
public class FoundPostSummaries {

    private final List<FoundPostSummary> value;

    public FoundPostSummaries(Posts posts) {
        this.value = posts
                .getValue()
                .stream()
                .map(FoundPostSummary::new)
                .toList();
    }
}
