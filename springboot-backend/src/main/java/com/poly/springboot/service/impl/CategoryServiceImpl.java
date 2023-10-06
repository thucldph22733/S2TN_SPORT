package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.entity.Category;
import com.poly.springboot.repository.CategoryRepository;
import com.poly.springboot.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> getPageCate(Integer pageNo) {
        return null;
    }

    @Override
    public String deleteCate(Long id) {
        if(categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";

    }

    @Override
    public Category findById(Long id) {
        //Tim id chuyen vao
        Optional<Category> result = categoryRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Category savaCate(CategoryRequestDto categoryRequestDto) {
        Category category = new Category();
        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());
        categoryRepository.save(category);
        return category;
    }

    @Override
    public Category updateCate(CategoryRequestDto categoryRequestDto, Long id) {
        Category category = categoryRepository.findById(id).get();
        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());
        categoryRepository.save(category);
        return category;
    }
}
