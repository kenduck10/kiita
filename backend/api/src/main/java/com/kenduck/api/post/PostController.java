package com.kenduck.api.post;

import com.kenduck.api.post.dtos.CreateComment;
import com.kenduck.api.post.dtos.CreatePost;
import com.kenduck.api.post.dtos.UpdatePost;
import com.kenduck.api.post.requests.CreateCommentRequest;
import com.kenduck.api.post.requests.CreatePostRequest;
import com.kenduck.api.post.requests.UpdatePostRequest;
import com.kenduck.api.post.responses.FindCommentsResponse;
import com.kenduck.api.post.responses.FindPostResponse;
import com.kenduck.api.post.responses.FindPostSummariesResponse;
import com.kenduck.common.comment.dtos.FoundComments;
import com.kenduck.common.comment.services.CreateCommentService;
import com.kenduck.common.comment.services.FindCommentService;
import com.kenduck.common.post.dtos.FoundPost;
import com.kenduck.common.post.dtos.FoundPostSummaries;
import com.kenduck.common.post.services.CreatePostService;
import com.kenduck.common.post.services.DeletePostService;
import com.kenduck.common.post.services.FindPostService;
import com.kenduck.common.post.services.UpdatePostService;
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
    private final UpdatePostService updatePostService;

    @NonNull
    private final DeletePostService deletePostService;

    @NonNull
    private final FindCommentService findCommentService;

    @NonNull
    private final CreateCommentService createCommentService;

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

    @PatchMapping("/{postId}")
    ResponseEntity<Void> updatePost(
            @PathVariable("postId") int postId,
            @RequestBody @Validated UpdatePostRequest request) {
        updatePostService.updatePost(
                new UpdatePost(postId, request)
        );
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<Void> deletePost(@PathVariable("postId") int postId) {
        deletePostService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}/comments")
    ResponseEntity<FindCommentsResponse> findComments(@PathVariable("postId") int postId) {
        FoundComments foundComments = findCommentService.findCommentsByPostId(postId);
        return ResponseEntity.ok(new FindCommentsResponse(foundComments));
    }

    @PostMapping("/{postId}/comments")
    ResponseEntity<Integer> createComment(
            @PathVariable("postId") int postId,
            @RequestBody @Validated CreateCommentRequest request) {
        int createdCommentId = createCommentService.createComment(
                new CreateComment(postId, request)
        );
        return ResponseEntity.ok(createdCommentId);
    }
}
