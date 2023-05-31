package com.kenduck.api.post;

import com.kenduck.api.post.responses.FindPostResponse;
import com.kenduck.api.post.responses.FindPostSummariesResponse;
import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.services.FindPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{postId}")
    ResponseEntity<FindPostResponse> findPost(@PathVariable("postId") int postId) {
        FoundPost foundPost = findPostService.findPostById(postId);
        return ResponseEntity.ok(new FindPostResponse(foundPost));
    }

}
