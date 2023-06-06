package com.kenduck.api.comment;

import com.kenduck.common.comment.services.DeleteCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    @NonNull
    private final DeleteCommentService deleteCommentService;

    @DeleteMapping("/{commentId}")
    ResponseEntity<Void> deleteComment(@PathVariable("commentId") int commentId) {
        deleteCommentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
