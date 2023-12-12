package com.poly.springboot.repository;

import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Boolean existsByProductName(String productName);

    Page<Product> findByProductNameContaining(String name, Pageable pageable);
    Page<Product> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Product> findByProductNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);

    List<Product> findAllByDeletedTrue();
}
