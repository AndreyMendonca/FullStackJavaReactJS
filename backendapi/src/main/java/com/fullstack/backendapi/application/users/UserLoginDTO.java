package com.fullstack.backendapi.application.users;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String email;
    private String password;
}
