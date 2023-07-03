package com.kenduck.api.post.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import static com.kenduck.common.post.models.Post.MAX_TITLE_LENGTH;

@Data
public class UpdatePostRequest {

    @Length(max = MAX_TITLE_LENGTH)
    @NotBlank
    private String title;

    @NotBlank
    private String body;

    @NotNull
    private Boolean isDraft;
}
