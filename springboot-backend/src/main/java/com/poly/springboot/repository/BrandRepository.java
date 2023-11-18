package com.poly.springboot.repository;

import com.poly.springboot.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    Boolean existsByBrandName(String brandName);

    // Lọc những bản ghi chưa bị xóa mềm
    List<Brand> findByIsDeletedFalse();
}
