package com.kenduck.api.post;

import com.kenduck.api.post.responses.FindPostSummariesResponse;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.services.FindPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    @NonNull
    private final FindPostService findPostService;

    @GetMapping("")
    ResponseEntity<FindPostSummariesResponse> findPostSummaries() {
        FoundPostSummaries foundPostSummaries = findPostService.findPostSummaries();
        return ResponseEntity.ok(new FindPostSummariesResponse(foundPostSummaries));
    }

}
