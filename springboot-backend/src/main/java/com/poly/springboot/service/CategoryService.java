package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();

    Boolean deleteCategory(Long id);


    Boolean createCategory(CategoryRequestDto categoryRequestDto);

    Boolean updateCategory(CategoryRequestDto categoryRequestDto,Long id);
}
