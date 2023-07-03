package com.kenduck.common.comment.models;


import com.kenduck.common.generated.models.GeneratedComment;
import lombok.Getter;

import java.util.List;

@Getter
public class Comments {

    private final List<Comment> value;

    public Comments(List<GeneratedComment> generatedComments) {
        this.value = generatedComments
                .stream()
                .map(Comment::new)
                .toList();
    }

    public List<Integer> getCommenterIds() {
        return this.value
                .stream()
                .map(GeneratedComment::getId)
                .toList();
    }
}
