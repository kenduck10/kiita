package com.kenduck.common.post.models;


import com.kenduck.common.generated.models.GeneratedPostPublicationTimestamp;

public class PostPublicationTimestamp extends GeneratedPostPublicationTimestamp {


    public PostPublicationTimestamp(GeneratedPostPublicationTimestamp generatedPostPublicationTimestamp) {
        super(
                generatedPostPublicationTimestamp.getId(),
                generatedPostPublicationTimestamp.getPostId(),
                generatedPostPublicationTimestamp.getFirstPublishedAt(),
                generatedPostPublicationTimestamp.getLastPublishedAt()
        );
    }

}
