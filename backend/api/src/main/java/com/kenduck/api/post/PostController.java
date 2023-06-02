package com.kenduck.api.post;

import com.kenduck.api.post.dtos.CreatePost;
import com.kenduck.api.post.requests.CreatePostRequest;
import com.kenduck.api.post.responses.FindPostResponse;
import com.kenduck.api.post.responses.FindPostSummariesResponse;
import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.services.CreatePostService;
import com.kenduck.common.post.services.DeletePostService;
import com.kenduck.common.post.services.FindPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    @NonNull
    private final FindPostService findPostService;

    @NonNull
    private final CreatePostService createPostService;

    @NonNull
    private final DeletePostService deletePostService;

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

    @PostMapping("")
    ResponseEntity<Integer> createPost(@RequestBody @Validated CreatePostRequest request) {
        int postId = createPostService.createPost(
                new CreatePost(request)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(postId);
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<Void> deletePost(@PathVariable("postId") int postId) {
        deletePostService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

}
