package com.poly.springboot.repository;

import com.poly.springboot.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    @Query("SELECT b FROM Brand b WHERE b.deleted = true ORDER BY b.createdAt DESC")
    List<Brand> findAllByDeletedTrue();

    Brand findByBrandName(String name);
    Boolean existsByBrandName(String brandName);
    Page<Brand> findByBrandNameContaining(String name, Pageable pageable);
    Page<Brand> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Brand> findByBrandNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
}
