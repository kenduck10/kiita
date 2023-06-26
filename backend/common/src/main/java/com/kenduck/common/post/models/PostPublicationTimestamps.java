package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPostPublicationTimestamp;
import lombok.Getter;

import java.util.List;
import java.util.Optional;

@Getter
public class PostPublicationTimestamps {

    private final List<PostPublicationTimestamp> value;

    public PostPublicationTimestamps(List<GeneratedPostPublicationTimestamp> generatedPostPublicationTimestamps) {
        this.value = generatedPostPublicationTimestamps
                .stream()
                .map(PostPublicationTimestamp::new)
                .toList();
    }

    public Optional<PostPublicationTimestamp> findFirstByPostId(int postId) {
        return this.value
                .stream()
                .filter((timestamp) -> timestamp.getPostId().equals(postId))
                .findFirst();
    }
}
