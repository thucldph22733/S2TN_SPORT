package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    Page<Category> getCategories(String name, List<Boolean> status, Pageable pageable);

    Boolean deleteCategory(Long id);

    Boolean createCategory(CategoryRequestDto categoryRequestDto);

    Boolean updateCategory(CategoryRequestDto categoryRequestDto,Long id);

    List<Category> findAllByDeletedTrue();
}
