package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.repository.CategoryRepository;
import com.poly.springboot.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CategoryController {

    @Autowired
    private CategoryService category;

    @GetMapping("category")
    public ResponseEntity<List<Category>> getCate() {
        List<Category> categories = category.getCategory();
        return ResponseEntity.ok(categories);

    }

    @GetMapping("category/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id){
        Category category1 = category.findById(id);
        return ResponseEntity.ok(category1);
    }

    @PostMapping("create-category")
    public ResponseEntity<Category>crateCategory(@RequestBody CategoryRequestDto categoryRequestDto){
        Category category1 = category.savaCate(categoryRequestDto);
        return ResponseEntity.ok(category1);
    }

    @PutMapping("update-category/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryRequestDto categoryRequestDto,@PathVariable Long id){
        Category category1 = category.updateCate(categoryRequestDto,id);
        return ResponseEntity.ok(category1);
    }

    @DeleteMapping("delete-category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id){
        String mes = category.deleteCate(id);
        return ResponseEntity.ok(mes);
    }
}
