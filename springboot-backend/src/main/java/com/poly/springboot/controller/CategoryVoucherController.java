package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CategoryVoucherRequestDto;
import com.poly.springboot.dto.responseDto.CategoryVoucherResponseDto;
import com.poly.springboot.entity.CategoryVoucher;
import com.poly.springboot.service.CategoryVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CategoryVoucherController {
    @Autowired
    private CategoryVoucherService categoryVoucherService;

    @PostMapping("create-categoryVoucher")
    public ResponseEntity<CategoryVoucher> create(@RequestBody CategoryVoucherRequestDto requestDto){
        CategoryVoucher categoryVoucher = categoryVoucherService.saveCategoryVoucher(requestDto);
        return ResponseEntity.ok(categoryVoucher);
    }

    @GetMapping("categoryVouchers")
    public ResponseEntity<List<CategoryVoucherResponseDto>> getPosition(){
        List<CategoryVoucherResponseDto> responseDtoList = categoryVoucherService.getCategoryVoucher();
        return ResponseEntity.ok(responseDtoList);
    }

    @GetMapping("categoryVoucher/{id}")
    public ResponseEntity<CategoryVoucher> getPosition (@PathVariable Long id){
        CategoryVoucher categoryVoucher = categoryVoucherService.findCategoryVoucherById(id);
        return ResponseEntity.ok(categoryVoucher);
    }

    @PutMapping("update-categoryVoucher/{id}")
    public ResponseEntity<CategoryVoucher> updatePosition(@RequestBody CategoryVoucherRequestDto positionRequestDto,@PathVariable Long id){
        CategoryVoucher categoryVoucher = categoryVoucherService.updateCategoryVoucher(positionRequestDto,id);
        return ResponseEntity.ok(categoryVoucher);
    }

    @DeleteMapping("delete-categoryVoucher/{id}")
    public ResponseEntity<String> deletePosition(@PathVariable Long id){
        String message = categoryVoucherService.delete(id);
        return ResponseEntity.ok(message);
    }

}
