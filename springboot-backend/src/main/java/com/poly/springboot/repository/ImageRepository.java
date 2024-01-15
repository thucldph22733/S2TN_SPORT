package com.poly.springboot.repository;

import com.poly.springboot.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {



    @Query("SELECT i FROM Image i WHERE i.product.id = :productId")
    List<Image> findImageByProductId(@Param("productId") Long productId);

    Optional<Image> findByImageName(String fileName);

    List<Image> findByImageLink(String imageLink);
}
