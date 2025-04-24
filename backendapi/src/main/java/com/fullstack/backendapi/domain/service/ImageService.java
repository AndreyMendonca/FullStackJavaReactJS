package com.fullstack.backendapi.domain.service;

import com.fullstack.backendapi.domain.entity.Image;

import java.util.Optional;

public interface ImageService {
    Image save(Image image);
    Optional<Image> getById(String id);
}
