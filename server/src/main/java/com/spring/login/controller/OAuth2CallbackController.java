package com.spring.login.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class OAuth2CallbackController {

    @GetMapping("/oauth2/callback/google")
    public RedirectView handleGoogleCallback(@RequestParam String token) {
        // Redirect to React frontend with the JWT token
        return new RedirectView("http://localhost:3000/oauth2/redirect?token=" + token);
    }
}