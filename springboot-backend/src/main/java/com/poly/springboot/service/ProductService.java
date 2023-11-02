package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;

import java.util.List;

public interface ProductService {
    List<ProductResponseDto> getProducts();

    List<ProductResponseDto> getPagination(Integer pageNo);

    Boolean deleteProduct(Long id);

    Boolean createProduct(ProductRequestDto productRequestDto);

    Boolean updateProduct(ProductRequestDto productRequestDto,Long id);

    Product findProductById(Long id);
}
