package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;

import java.util.List;

public interface ProductService {
    List<ProductResponseDto> findAll();

    List<ProductResponseDto> getPage(Integer pageNo);

    String delete(Long id);

    Product findById(Long id);

    Product save(ProductRequestDto productRequestDto);

    Product update(ProductRequestDto productRequestDto,Long id);
}
