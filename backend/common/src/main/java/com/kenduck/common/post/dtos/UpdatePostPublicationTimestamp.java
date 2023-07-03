package com.kenduck.common.post.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class UpdatePostPublicationTimestamp {

    private final int id;

    private final int postId;

    private final boolean isDraft;

    private final int authorId;

    private final String body;

}
