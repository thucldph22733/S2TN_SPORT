package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ProductDetailFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.*;
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

@CrossOrigin(origins = "*")
@RestController
@Validated
@RequestMapping("/api/v1/products/")
@Tag(name = "Products", description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang sản phẩm )")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("getAllProducts")
    public ResponseEntity<?> getProducts(@RequestBody ProductDetailFilterRequestDto requestDto) {


        Page<ProductFilterResponseDto> productPage = productService.findProductsAdminByFilters(requestDto);

        List<ProductFilterResponseDto> productResponseDtoList = productPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productResponseDtoList
                , productPage);
    }

    @GetMapping("getProductHomePageByProducts")
    public ResponseEntity<?> getProductHomePageByProductNew(@RequestParam(defaultValue = "0") Integer pageNo,
                                                            @RequestParam(defaultValue = "10") Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductUserResponseDto> productUserResponseDtoPage = productService.getProductHomePageByProducts(pageable);

        List<ProductUserResponseDto> productUserResponseDtoList = productUserResponseDtoPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productUserResponseDtoList
                , productUserResponseDtoPage);
    }

    @PostMapping("findProductsByFilters")
    public ResponseEntity<?> findProductsByFilters(
            @RequestBody ProductFilterRequestDto filter) {
        Pageable pageable = PageRequest.of(filter.getPageNo(), filter.getPageSize());
        Page<ProductUserResponseDto> productFilterPage = productService.
                findProductsByFilters(filter.getCategoryIds(),
                        filter.getBrandIds(),
                        filter.getColorIds(),
                        filter.getMaterialIds(),
                        filter.getSizeIds(),
                        filter.getMinPrice(),
                        filter.getMaxPrice(),
                        filter.getProductName()
                        ,pageable);
        List<ProductUserResponseDto> productFilteroList = productFilterPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productFilteroList
                , productFilterPage);
    }

    @GetMapping("findAllByDeletedTrue")
    public ResponseEntity<List<Product>> findAllByDeletedTrue() {
        List<Product> productList = productService.findAllByDeletedTrue();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productList);
    }

    @GetMapping("findProductById")
    public ResponseEntity<Product> findProductById(@RequestParam Long productId) {
        Product product = productService.findProductById(productId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(product);
    }

    @PostMapping("create")
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequestDto productRequestDto) {
        Product  product = productService.createProduct(productRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(product);
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
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> delete(@RequestParam Long id) {
        Boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }


}
