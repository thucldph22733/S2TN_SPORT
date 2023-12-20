package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.entity.Category;
import com.poly.springboot.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/categories/")
@Tag(name = "Categories",description = "( Rest API Hiển thị, thêm, sửa, xóa loại sản phẩm )")
@Validated
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("getAll")
    public ResponseEntity<?> getCategories(@RequestParam(defaultValue = "0") Integer pageNo,
                                       @RequestParam(defaultValue = "10") Integer pageSize,
                                       @RequestParam(required = false) String name,
                                       @RequestParam(required = false) List<Boolean> status) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Category> categoryPage = categoryService.getCategories(name, status, pageable);
        List<Category> categoryList = categoryPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        categoryList,
                        categoryPage);
    }

    @GetMapping("findAllByDeletedTrue")
    public ResponseEntity<List<Category>> findAllByDeletedTrue() {

        List<Category> categoryList = categoryService.findAllByDeletedTrue();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryList);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto>createCategory(@Valid  @RequestBody CategoryRequestDto categoryRequestDto){
        Boolean isCreated = categoryService.createCategory(categoryRequestDto);

        if (isCreated){
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateCategory(@Valid @RequestBody CategoryRequestDto categoryRequestDto,@RequestParam Long id){
        Boolean isUpdated = categoryService.updateCategory(categoryRequestDto,id);

        if (isUpdated){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteCategory(@RequestParam Long id){
        Boolean isDeleted = categoryService.deleteCategory(id);

        if (isDeleted){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
