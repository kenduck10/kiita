package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPost;
import lombok.Getter;

import java.util.List;

@Getter
public class Posts {

    private final List<Post> value;

    public Posts(List<GeneratedPost> generatedPosts) {
        this.value = generatedPosts
                .stream()
                .map(Post::new)
                .toList();
    }

    public List<Integer> getIds() {
        return this.value
                .stream()
                .map(GeneratedPost::getId)
                .toList();
    }

    public List<Integer> getAuthorIds() {
        return this.value
                .stream()
                .map(GeneratedPost::getAuthorId)
                .toList();
    }
}
