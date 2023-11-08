package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.CategoryRepository;
import com.poly.springboot.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Boolean deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("loại sản phẩm",String.valueOf(id)));
        categoryRepository.deleteById(category.getId());
        return true;
    }

    @Override
    public Boolean createCategory(CategoryRequestDto categoryRequestDto) {

        Category category = new Category();

        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());

        if (categoryRepository.existsByCategoryName(category.getCategoryName())){
            throw  new AlreadyExistsException("Tên loại sản phẩm đã tồn tại!");
        }

        categoryRepository.save(category);

        return true;
    }

    @Override
    public Boolean updateCategory(CategoryRequestDto categoryRequestDto, Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("loại sản phẩm",String.valueOf(id)));

        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());
        categoryRepository.save(category);

        return true;
    }
}
