package com.poly.springboot.repository;

import com.poly.springboot.entity.Brand;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    Category findByCategoryName(String name);
    @Query("SELECT c FROM Category c WHERE c.deleted = true ORDER BY c.createdAt DESC")

    List<Category> findAllByDeletedTrue();
    Boolean existsByCategoryName(String CategoryName);
    Page<Category> findByCategoryNameContaining(String name, Pageable pageable);
    Page<Category> findByDeletedIn(List<Boolean> status, Pageable pageable);

    Page<Category> findByCategoryNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);

    }
