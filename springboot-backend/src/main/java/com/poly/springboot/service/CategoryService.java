package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategory();

    List<Category> getPageCate(Integer pageNo);

    String deleteCate(Long id);

    Category findById(Long id);

    Category savaCate(CategoryRequestDto categoryRequestDto);

    Category updateCate(CategoryRequestDto categoryRequestDto,Long id);
}
