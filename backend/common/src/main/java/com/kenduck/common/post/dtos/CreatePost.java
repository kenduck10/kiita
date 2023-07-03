package com.kenduck.common.post.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class CreatePost {

    private final String title;

    private final boolean isDraft;

    private int authorId;

    private final String body;

}
