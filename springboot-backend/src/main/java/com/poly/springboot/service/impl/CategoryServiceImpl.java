package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.CategoryRepository;
import com.poly.springboot.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<Category> getCategories(String name, List<Boolean> status, Pageable pageable) {

        Page<Category> CategoryList;

        if (name == null && status == null){
            CategoryList = categoryRepository.findAll(pageable);
        }else if (name == null){
            CategoryList = categoryRepository.findByDeletedIn(status,pageable);
        }else if (status == null){
            CategoryList = categoryRepository.findByCategoryNameContaining(name,pageable);
        }else {
            CategoryList = categoryRepository.findByCategoryNameContainingAndDeletedIn(name,status,pageable);
        }
        return CategoryList;
    }

    @Override
    public Boolean deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id loại sản phẩm này!"));

        category.setDeleted(!category.getDeleted());

        categoryRepository.save(category);

        return true;
    }

    @Override
    public Boolean createCategory(CategoryRequestDto categoryRequestDto) {

        Category category = new Category();

        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());
        category.setDeleted(categoryRequestDto.getDeleted());

        if (categoryRepository.existsByCategoryName(category.getCategoryName())){
            throw  new AlreadyExistsException("Tên loại sản phẩm đã tồn tại!");
        }

        categoryRepository.save(category);

        return true;
    }

    @Override
    public Boolean updateCategory(CategoryRequestDto categoryRequestDto, Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id loại sản phẩm này!"));

        category.setCategoryDescribe(categoryRequestDto.getCategoryDescribe());
        category.setCategoryName(categoryRequestDto.getCategoryName());
        category.setDeleted(categoryRequestDto.getDeleted());
        categoryRepository.save(category);

        return true;
    }

    @Override
    public List<Category> findAllByDeletedTrue() {
        return categoryRepository.findAllByDeletedTrue();
    }
}
