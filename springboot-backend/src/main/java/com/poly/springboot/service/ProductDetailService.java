package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.ProductDetail;

import java.util.List;

public interface ProductDetailService {
    List<ProductDetailResponseDto> findAll();

    List<ProductDetail> getPage(Integer pageNo);

    String delete(Long id);

    ProductDetail findById(Long id);

    ProductDetail save(ProductDetailRequestDto productDetailRequestDto);

    ProductDetail update(ProductDetailRequestDto productDetailRequestDto,Long id);
}
