package com.kenduck.api.post;

import com.kenduck.api.auth.LoginMember;
import com.kenduck.api.post.dtos.CreateComment;
import com.kenduck.api.post.dtos.CreatePost;
import com.kenduck.api.post.dtos.DeletePost;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 記事コントローラ
 */
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

    /**
     * 記事一覧取得
     *
     * @return 記事一覧
     */
    @GetMapping("")
    ResponseEntity<FindPostSummariesResponse> findPostSummaries() {
        FoundPostSummaries foundPostSummaries = findPostService.findPostSummaries();
        return ResponseEntity.ok(new FindPostSummariesResponse(foundPostSummaries));
    }

    /**
     * 記事取得
     *
     * @param postId 記事ID
     * @return 記事
     */
    @GetMapping("/{postId}")
    ResponseEntity<FindPostResponse> findPost(@PathVariable("postId") int postId) {
        FoundPost foundPost = findPostService.findPostById(postId);
        return ResponseEntity.ok(new FindPostResponse(foundPost));
    }

    /**
     * 記事作成
     *
     * @param request     作成内容
     * @param loginMember ログインユーザー
     * @return 記事ID
     */
    @PostMapping("")
    ResponseEntity<Integer> createPost(
            @RequestBody @Validated CreatePostRequest request,
            @AuthenticationPrincipal LoginMember loginMember
    ) {
        int postId = createPostService.createPost(
                new CreatePost(request, loginMember)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(postId);
    }

    /**
     * 記事更新
     *
     * @param postId      記事ID
     * @param request     更新内容
     * @param loginMember ログインユーザー
     * @return レスポンスボディなし
     */
    @PatchMapping("/{postId}")
    ResponseEntity<Void> updatePost(
            @PathVariable("postId") int postId,
            @RequestBody @Validated UpdatePostRequest request,
            @AuthenticationPrincipal LoginMember loginMember
    ) {
        updatePostService.updatePost(
                new UpdatePost(postId, request, loginMember)
        );
        return ResponseEntity.ok().build();
    }

    /**
     * 記事削除
     *
     * @param postId      記事ID
     * @param loginMember ログインユーザー
     * @return レスポンスボディなし
     */
    @DeleteMapping("/{postId}")
    ResponseEntity<Void> deletePost(
            @PathVariable("postId") int postId,
            @AuthenticationPrincipal LoginMember loginMember
    ) {
        deletePostService.deletePost(new DeletePost(postId, loginMember));
        return ResponseEntity.ok().build();
    }

    /**
     * 指定したIDの記事のコメント一覧取得
     *
     * @param postId 記事ID
     * @return コメント一覧
     */
    @GetMapping("/{postId}/comments")
    ResponseEntity<FindCommentsResponse> findComments(@PathVariable("postId") int postId) {
        FoundComments foundComments = findCommentService.findCommentsByPostId(postId);
        return ResponseEntity.ok(new FindCommentsResponse(foundComments));
    }

    /**
     * 指定したIDの記事のコメント作成
     *
     * @param postId      記事ID
     * @param request     コメント内容
     * @param loginMember ログインユーザー
     * @return コメントID
     */
    @PostMapping("/{postId}/comments")
    ResponseEntity<Integer> createComment(
            @PathVariable("postId") int postId,
            @RequestBody @Validated CreateCommentRequest request,
            @AuthenticationPrincipal LoginMember loginMember
    ) {
        int createdCommentId = createCommentService.createComment(
                new CreateComment(postId, request)
        );
        return ResponseEntity.ok(createdCommentId);
    }
}
