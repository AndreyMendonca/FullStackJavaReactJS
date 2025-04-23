package com.fullstack.backendapi.application.images;

import com.fullstack.backendapi.domain.entity.Image;
import com.fullstack.backendapi.domain.service.ImageService;
import com.fullstack.backendapi.infra.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository repository;

    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }
}
