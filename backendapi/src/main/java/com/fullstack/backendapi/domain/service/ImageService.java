package com.fullstack.backendapi.domain.service;

import com.fullstack.backendapi.domain.entity.Image;
import com.fullstack.backendapi.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image save(Image image);
    Optional<Image> getById(String id);
    List<Image> search (ImageExtension extension, String query);
}
