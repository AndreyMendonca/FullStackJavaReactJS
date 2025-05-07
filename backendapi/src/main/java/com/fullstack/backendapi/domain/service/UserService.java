package com.fullstack.backendapi.domain.service;

import com.fullstack.backendapi.domain.AccessToken;
import com.fullstack.backendapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken authentication(String email, String password);
}
