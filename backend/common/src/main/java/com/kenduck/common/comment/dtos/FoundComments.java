package com.kenduck.common.comment.dtos;

import com.kenduck.common.comment.models.Comments;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@EqualsAndHashCode
public class FoundComments {

    private final List<FoundComment> value;

    public FoundComments(Comments comments) {
        this.value = comments
                .getValue()
                .stream()
                .map(FoundComment::new)
                .toList();
    }
}
