package com.kenduck.api.comment;

import com.kenduck.api.comment.responses.FindCommentsResponse;
import com.kenduck.common.comment.dtos.FoundComments;
import com.kenduck.common.comment.services.FindCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    @NonNull
    private final FindCommentService findCommentService;

    @GetMapping("/{postId}")
    ResponseEntity<FindCommentsResponse> findComments(@PathVariable("postId") int postId) {
        FoundComments foundComments = findCommentService.findCommentsByPostId(postId);
        return ResponseEntity.ok(new FindCommentsResponse(foundComments));
    }
}
