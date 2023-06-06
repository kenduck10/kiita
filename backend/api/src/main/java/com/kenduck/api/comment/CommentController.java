package com.kenduck.api.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

//    @NonNull
//    private final FindCommentService findCommentService;
//
//    @GetMapping("/{postId}")
//    ResponseEntity<FindCommentsResponse> findComments(@PathVariable("postId") int postId) {
//        FoundComments foundComments = findCommentService.findCommentsByPostId(postId);
//        return ResponseEntity.ok(new FindCommentsResponse(foundComments));
//    }
}
