package com.poly.springboot.repository;

import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    Boolean existsByCategoryName(String categoryName);

    // Lọc những bản ghi chưa bị xóa mềm
    List<User> findByIsDeletedFalse();
}
