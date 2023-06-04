package com.kenduck.common.post.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class UpdatePost {

    private final int postId;

    private final String title;

    private final String body;

}
