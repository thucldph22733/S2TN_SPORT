package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CategoryClubRequestDto;
import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.CategoryClub;
import com.poly.springboot.repository.CategoryRepository;
import com.poly.springboot.service.CategoryClubService;
import com.poly.springboot.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CategoryClubController {

    @Autowired
    private CategoryClubService categoryClubService;

    @GetMapping("categoryClubs")
    public ResponseEntity<List<CategoryClub>> getCategoryClubs() {
        List<CategoryClub> categoryClubList = categoryClubService.getCategoryClubs();
        return ResponseEntity.ok(categoryClubList);

    }

    @GetMapping("categoryClub/{id}")
    public ResponseEntity<CategoryClub> findCategoryClubById(@PathVariable Long id){
        CategoryClub categoryClub = categoryClubService.findCategoryClubById(id);
        return ResponseEntity.ok(categoryClub);
    }

    @PostMapping("create-categoryClub")
    public ResponseEntity<CategoryClub>createCategoryClub(@RequestBody CategoryClubRequestDto categoryClubRequestDto){
        CategoryClub categoryClub = categoryClubService.saveCategoryClub(categoryClubRequestDto);
        return ResponseEntity.ok(categoryClub);
    }

    @PutMapping("update-categoryClub/{id}")
    public ResponseEntity<CategoryClub> updateCategoryClub(@RequestBody CategoryClubRequestDto categoryClubRequestDto, @PathVariable Long id){
        CategoryClub categoryClub = categoryClubService.updateCategoryClub(categoryClubRequestDto,id);
        return ResponseEntity.ok(categoryClub);
    }

    @DeleteMapping("delete-categoryClub/{id}")
    public ResponseEntity<String> deleteCategoryClub(@PathVariable Long id){
        String mes = categoryClubService.deleteCategoryClub(id);
        return ResponseEntity.ok(mes);
    }
}
