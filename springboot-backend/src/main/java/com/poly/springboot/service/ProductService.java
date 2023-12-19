package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductService {
    Page<ProductResponseDto> getProducts(String name, List<Boolean> status, Pageable pageable);

    Page<ProductUserResponseDto> getProductHomePageByProductNew(Pageable pageable);
    Page<ProductUserResponseDto> getProductHomePageByProductHot(Pageable pageable);
    Page<ProductUserResponseDto> getProductHomePageByProductSale(Pageable pageable);

//    Boolean deleteProduct(Long id);

    Boolean createProduct(ProductRequestDto productRequestDto);

    Boolean updateProduct(ProductRequestDto productRequestDto,Long id);

    List<Product> findAllByDeletedTrue();

}
