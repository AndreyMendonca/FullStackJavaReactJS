package com.fullstack.backendapi.infra.repository;

import com.fullstack.backendapi.domain.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, String> {
}
