package com.spring.login.controller;

import com.spring.login.exception.ResourceNotFoundException;
import com.spring.login.model.User;
import com.spring.login.repository.UserRepository;
import com.spring.login.security.CurrentUser;
import com.spring.login.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.login.payload.SetPasswordRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
//    @PreAuthorize("hasAuthority('USER')")  // Use hasAuthority instead of hasRole
    @PreAuthorize("isAuthenticated()")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PostMapping("/user/set-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> setPassword(@CurrentUser UserPrincipal userPrincipal,
                                              @RequestBody SetPasswordRequest request) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        // Encode and set the new password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Password set successfully");
    }

}
