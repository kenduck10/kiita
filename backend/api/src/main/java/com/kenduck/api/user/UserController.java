package com.kenduck.api.user;

import com.kenduck.api.user.dtos.CreateUser;
import com.kenduck.api.user.dtos.UpdateUser;
import com.kenduck.api.user.requests.CreateUserRequest;
import com.kenduck.api.user.requests.UpdateUserRequest;
import com.kenduck.api.user.responses.CreateUserResponse;
import com.kenduck.api.user.responses.FindUserResponse;
import com.kenduck.api.user.responses.FindUserSummariesResponse;
import com.kenduck.common.user.dtos.CreatedUser;
import com.kenduck.common.user.dtos.FoundUser;
import com.kenduck.common.user.dtos.FoundUserSummaries;
import com.kenduck.common.user.services.CreateUserService;
import com.kenduck.common.user.services.DeleteUserService;
import com.kenduck.common.user.services.FindUserService;
import com.kenduck.common.user.services.UpdateUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @NonNull
    private final FindUserService findUserService;

    @NonNull
    private final CreateUserService createUserService;

    @NonNull
    private final UpdateUserService updateUserService;

    @NonNull
    private final DeleteUserService deleteUserService;

    @GetMapping("")
    ResponseEntity<FindUserSummariesResponse> findUserSummaries() {
        FoundUserSummaries foundUserSummaries = findUserService.findAllUserSummaries();
        return ResponseEntity.ok(new FindUserSummariesResponse(foundUserSummaries));
    }

    @GetMapping("/{userId}")
    ResponseEntity<FindUserResponse> findUser(@PathVariable("userId") int userId) {
        FoundUser foundUser = findUserService.findUserById(userId);
        return ResponseEntity.ok(new FindUserResponse(foundUser));
    }

    @PostMapping("")
    ResponseEntity<CreateUserResponse> createUser(@RequestBody @Validated CreateUserRequest request) {
        CreatedUser createdUser = createUserService.createUser(
                new CreateUser(request)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateUserResponse(createdUser));
    }

    @PutMapping("/{userId}")
    ResponseEntity<Void> updateUser(
            @PathVariable("userId") int userId,
            @RequestBody @Validated UpdateUserRequest request) {
        updateUserService.updateUser(
                new UpdateUser(userId, request)
        );
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}")
    ResponseEntity<Void> deleteUser(@PathVariable("userId") int userId) {
        deleteUserService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
