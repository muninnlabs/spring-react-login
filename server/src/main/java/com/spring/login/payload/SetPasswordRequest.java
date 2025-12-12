package com.spring.login.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SetPasswordRequest {

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}