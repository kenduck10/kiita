package com.kenduck.api.member;

import com.kenduck.api.member.dtos.CreateMember;
import com.kenduck.api.member.requests.CreateMemberRequest;
import com.kenduck.common.member.services.CreateMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    @NonNull
    private final CreateMemberService createMemberService;

    @PostMapping("")
    ResponseEntity<Integer> createMember(@RequestBody @Validated CreateMemberRequest request) {
        int memberId = createMemberService.createMember(
                new CreateMember(request)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(memberId);
//        return ResponseEntity.status(HttpStatus.CREATED).body(1);
    }
}
