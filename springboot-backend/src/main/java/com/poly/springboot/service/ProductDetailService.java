package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.ProductDetail;

import java.util.List;

public interface ProductDetailService {
    List<ProductDetailResponseDto> getProductDetails();

    List<ProductDetailResponseDto> getPagination(Integer pageNo);

    Boolean deleteProductDetail(Long id);

//    List<ProductDetail> findByIdProductDetailsId(Long id);

    Boolean createProductDetail(ProductDetailRequestDto productDetailRequestDto);

    Boolean updateProductDetail(ProductDetailRequestDto productDetailRequestDto,Long id);
}
