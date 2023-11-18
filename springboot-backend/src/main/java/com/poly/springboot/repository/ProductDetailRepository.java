package com.poly.springboot.repository;

import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail,Long> {

    // Lọc những bản ghi chưa bị xóa mềm
    List<User> findByIsDeletedFalse();
}
