package com.fullstack.backendapi.domain.service;

import com.fullstack.backendapi.domain.AcessToken;
import com.fullstack.backendapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AcessToken authentication(String email, String password);
}
