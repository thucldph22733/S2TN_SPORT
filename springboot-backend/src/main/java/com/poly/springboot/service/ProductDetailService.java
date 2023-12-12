package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.BestSellingProductResponsesDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.ProductDetail;

import java.util.List;
import java.util.Map;

public interface ProductDetailService {
    List<ProductDetailResponseDto> getProductDetails();

    List<ProductDetailResponseDto> getPagination(Integer pageNo);

    Boolean deleteProductDetail(Long id);

    ProductDetail findByIdProductDetailsId(Long id);

    Boolean createProductDetail(ProductDetailRequestDto productDetailRequestDto);

    Boolean updateProductDetail(ProductDetailRequestDto productDetailRequestDto,Long id);

    List<Map<String, Object>> getTop10BestSellingProducts();
}
