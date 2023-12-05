package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<ProductResponseDto> getProducts(String name, List<Boolean> status, Pageable pageable);

//    Boolean deleteProduct(Long id);

    Boolean createProduct(ProductRequestDto productRequestDto);

    Boolean updateProduct(ProductRequestDto productRequestDto,Long id);


}
