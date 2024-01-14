package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.responseDto.MaterialInfoResponseDto;
import com.poly.springboot.dto.requestDto.PDUpdateRequestDto;
import com.poly.springboot.dto.requestDto.ProductDetailFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.*;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.service.ProductDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/productDetails/")
@Tag(name = "ProductDetails", description = "( Rest API Hiển thị, thêm, sửa, xóa sản, phân trang, tìm kiếm sản phẩm chi tiết)")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @PostMapping("getAllProductDetailsFilter")
    public ResponseEntity<?> getProductDetails(@RequestBody ProductDetailFilterRequestDto requestDto) {

        Page<ProductDetailResponseDto> productPage = productDetailService.getProductDetails(requestDto);

        List<ProductDetailResponseDto> productResponseDtoList = productPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , productResponseDtoList
                , productPage);
    }

    @GetMapping("getProductDetailsByProductId")
    public ResponseEntity<ProductDetailInfoResponseDto> getProductDetailsByProductId(@RequestParam Long productId) {
        ProductDetailInfoResponseDto productDetailInfoResponseDtos = productDetailService.getProductDetailsByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(productDetailInfoResponseDtos);
    }

    @PostMapping("findQuantityAndPrice")
    public ResponseEntity<PDUpdateResponseDto> findQuantityAndPriceUpdateByProductDetail(@RequestBody PDUpdateRequestDto pdUpdateRequestDto) {
        PDUpdateResponseDto pdUpdateResponseDto = productDetailService.findQuantityAndPriceByProductIdAndColorIdAndSizeId(pdUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(pdUpdateResponseDto);
    }

    @GetMapping("findColorNamesByProductId")
    public ResponseEntity<List<ColorInfoResponseDto>> findColorNamesByProductId(@RequestParam Long productId) {
        List<ColorInfoResponseDto> colorInfoResponseDtos = productDetailService.getColorNamesByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(colorInfoResponseDtos);
    }

    @GetMapping("findMaterialNamesByProductId")
    public ResponseEntity<List<MaterialInfoResponseDto>> findMaterialNamesByProductId(@RequestParam Long productId) {
        List<MaterialInfoResponseDto> colorInfoResponseDtos = productDetailService.getMaterialNamesByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(colorInfoResponseDtos);
    }
    @GetMapping("findSizeNamesByProductId")
    public ResponseEntity<List<SizeInfoResponseDto>> findSizeNamesByProductId(@RequestParam Long productId) {
        List<SizeInfoResponseDto> sizeInfoResponseDtos = productDetailService.getSizeNamesByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(sizeInfoResponseDtos);
    }

    @PostMapping("createList")
    public ResponseEntity<?> createProductDetails(@RequestBody List<ProductDetailRequestDto> productDetailRequestDtos) {
        Boolean isCreated = productDetailService.createProductDetails(productDetailRequestDtos);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PostMapping("create")
    public ResponseEntity<?> createProductDetail(@RequestBody ProductDetailRequestDto requestDto) {
        Boolean isCreated = productDetailService.createProductDetail(requestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }


    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateProductDetail(@RequestBody ProductDetailRequestDto productRequestDto, @RequestParam Long id) {
        Boolean isUpdated = productDetailService.updateProductDetail(productRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteProductDetail(@RequestParam Long id) {
        Boolean isDeleted = productDetailService.deleteProductDetail(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("getAllByProductId")
    public ResponseEntity<?> findAllByProductId(@RequestParam Long productId,
                                                @RequestParam(defaultValue = "0") Integer pageNo,
                                                @RequestParam(defaultValue = "10") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<ProductDetailResponseDto> responseDtoPage = productDetailService.findAllByProductId(productId, pageable);
        List<ProductDetailResponseDto> detailResponseDtoList = responseDtoPage.getContent();
        return ResponseHandler.generateResponse(
                HttpStatus.OK
                , detailResponseDtoList
                , responseDtoPage);
    }

    @GetMapping("findProductDetailById")
    public ResponseEntity<?> findProductDetailById(@RequestParam Long id) {
        ProductDetail productDetail = productDetailService.findProductDetailById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(productDetail);
    }


}
