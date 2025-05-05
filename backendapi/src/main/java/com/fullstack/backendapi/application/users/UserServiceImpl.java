package com.fullstack.backendapi.application.users;

import com.fullstack.backendapi.domain.AcessToken;
import com.fullstack.backendapi.domain.entity.User;
import com.fullstack.backendapi.domain.exception.DuplicatedTuplaException;
import com.fullstack.backendapi.domain.service.UserService;
import com.fullstack.backendapi.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
        var possibleUser = getByEmail(user.getEmail());
        if(possibleUser != null){
            throw new DuplicatedTuplaException("User already exists");
        }
        return repository.save(user);
    }

    @Override
    public AcessToken authentication(String email, String password) {
        return null;
    }
}
