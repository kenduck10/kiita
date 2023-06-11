package com.kenduck.common.comment.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class CreateComment {

    private final int postId;

    private final String body;
}
