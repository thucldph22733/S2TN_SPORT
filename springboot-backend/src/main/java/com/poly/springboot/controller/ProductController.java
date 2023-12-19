package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Product;
import com.poly.springboot.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@RequestMapping("/api/v1/products/")
@Tag(name = "Products", description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang sản phẩm )")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("getAll")
    public ResponseEntity<?> getProducts(@RequestParam(defaultValue = "0") Integer pageNo,
                                         @RequestParam(defaultValue = "10") Integer pageSize,
                                         @RequestParam(required = false) String name,
                                         @RequestParam(required = false) List<Boolean> status) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductResponseDto> productPage = productService.getProducts(name, status, pageable);

        List<ProductResponseDto> productResponseDtoList = productPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productResponseDtoList
                , productPage);
    }
    @GetMapping("getProductHomePageByProductNew")
    public ResponseEntity<?> getProductHomePageByProductNew(@RequestParam(defaultValue = "0") Integer pageNo,
                                         @RequestParam(defaultValue = "10") Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductUserResponseDto> productUserResponseDtoPage = productService.getProductHomePageByProductNew( pageable);

        List<ProductUserResponseDto> productUserResponseDtoList = productUserResponseDtoPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productUserResponseDtoList
                , productUserResponseDtoPage);
    }
    @GetMapping("getProductHomePageByProductSale")
    public ResponseEntity<?> getProductHomePageByProductSale(@RequestParam(defaultValue = "0") Integer pageNo,
                                                            @RequestParam(defaultValue = "10") Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductUserResponseDto> productUserResponseDtoPage = productService.getProductHomePageByProductSale(pageable);

        List<ProductUserResponseDto> productUserResponseDtoList = productUserResponseDtoPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productUserResponseDtoList
                , productUserResponseDtoPage);
    }
    @GetMapping("getProductHomePageByProductHot")
    public ResponseEntity<?> getProductHomePageByProductHot(@RequestParam(defaultValue = "0") Integer pageNo,
                                                            @RequestParam(defaultValue = "10") Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductUserResponseDto> productUserResponseDtoPage = productService.getProductHomePageByProductHot( pageable);

        List<ProductUserResponseDto> productUserResponseDtoList = productUserResponseDtoPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productUserResponseDtoList
                , productUserResponseDtoPage);
    }

    @GetMapping("findAllByDeletedTrue")
    public ResponseEntity<List<Product>> findAllByDeletedTrue() {
        List<Product> productList = productService.findAllByDeletedTrue();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productList);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> create(@Valid @RequestBody ProductRequestDto productRequestDto) {
        Boolean isCreated = productService.createProduct(productRequestDto);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> update(@Valid @RequestBody ProductRequestDto productRequestDto, @RequestParam Long id) {
        Boolean isUpdated = productService.updateProduct(productRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
//
//    @DeleteMapping("delete")
//    public ResponseEntity<ResponseDto> delete(@RequestParam Long id) {
//        Boolean isDeleted = productService.deleteProduct(id);
//        if (isDeleted) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }

}
