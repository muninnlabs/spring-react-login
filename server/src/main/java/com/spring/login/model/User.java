package com.spring.login.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
public class User {

    @Id
    private String id;

    private String name;

    @Field("email")
    private String email;

    private String imageUrl;

    private Boolean emailVerified = false;

    @JsonIgnore
    @Field("password")
    private String password;

    @Field("password_set")
    private Boolean passwordSet = false;

    private AuthProvider provider;

    private String providerId;
}