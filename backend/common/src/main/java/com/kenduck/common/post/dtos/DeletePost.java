package com.kenduck.common.post.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class DeletePost {

    private final int postId;

    private final int deleterId;

}
