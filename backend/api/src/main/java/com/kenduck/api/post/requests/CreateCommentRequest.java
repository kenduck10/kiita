package com.kenduck.api.post.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCommentRequest {

    @NotBlank
    private String body;

}
