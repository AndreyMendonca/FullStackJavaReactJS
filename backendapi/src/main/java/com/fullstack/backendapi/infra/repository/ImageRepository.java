package com.fullstack.backendapi.infra.repository;

import com.fullstack.backendapi.domain.entity.Image;
import com.fullstack.backendapi.domain.enums.ImageExtension;
import com.fullstack.backendapi.infra.repository.specs.ImageSpecs;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {
    /**
     *
     * @param extension
     * @param query
     * @return
     * SELECT * FROM IMAGE WHERE 1=1 AND EXTENSION = 'PNG' AND (NAME LIKE 'QUERY' OR TAGS LIKE 'QUERY)
     */

    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query){
        //SELECT * FROM IMAGE WHERE 1=1
        Specification<Image> conjunction = (root, q , criteriaBuilder) -> criteriaBuilder.conjunction();
        Specification<Image> spec = Specification.where(conjunction);

        if(extension != null){
            //AND EXTENSION = 'PNG'
            spec = spec.and(ImageSpecs.extensionEqual(extension));
        }

        if(StringUtils.hasText(query)){
            // AND (NAME LIKE 'QUERY' OR TAGS LIKE 'QUERY')
            Specification<Image> nameOrTagsLike = Specification.anyOf(ImageSpecs.nameLike(query), ImageSpecs.tagsLike(query));

            spec = spec.and(nameOrTagsLike);
        }
        return findAll(spec);
    }
}
