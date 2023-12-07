package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.service.ProductDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/productDetails/")
@Tag(name = "ProductDetails",description = "( Rest API Hiển thị, thêm, sửa, xóa sản, phân trang, tìm kiếm sản phẩm chi tiết)")
public class ProductDetailController {

   @Autowired
   private ProductDetailService productDetailService;

    @GetMapping("getAll")
    public ResponseEntity<List<ProductDetailResponseDto>> getProductDetails() {
        List<ProductDetailResponseDto> productDetailResponseDtoList = productDetailService.getProductDetails();
        return ResponseEntity.status(HttpStatus.OK)
                .body(productDetailResponseDtoList);
    }

    @GetMapping("pagination")
    public ResponseEntity<List<ProductDetailResponseDto>> getPagination(@RequestParam Optional<Integer> pageNo) {
        List<ProductDetailResponseDto> productDetailResponseDtoList = productDetailService.getPagination(pageNo.orElse(0));
        return ResponseEntity.status(HttpStatus.OK)
                .body(productDetailResponseDtoList);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createProductDetail(@RequestBody ProductDetailRequestDto productRequestDto){
        Boolean isCreated = productDetailService.createProductDetail(productRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateProductDetail(@RequestBody ProductDetailRequestDto productRequestDto, @RequestParam Long id){
        Boolean isUpdated = productDetailService.updateProductDetail(productRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteProductDetail(@RequestParam Long id){
        Boolean isDeleted = productDetailService.deleteProductDetail(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("findProductDetailById")
    public ResponseEntity<ProductDetail> finddProductDetailById(@RequestParam Long id){
        ProductDetail productDetail = productDetailService.findByIdProductDetailsId(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productDetail);
    }
}
