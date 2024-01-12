package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductDetailFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductFilterResponseDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductService {

    Page<ProductFilterResponseDto> findProductsAdminByFilters(ProductDetailFilterRequestDto requestDto);
    Page<ProductUserResponseDto> getProductHomePageByProducts(Pageable pageable);

    Boolean deleteProduct(Long id);

    Product createProduct(ProductRequestDto productRequestDto);

    Boolean updateProduct(ProductRequestDto productRequestDto, Long id);

    List<Product> findAllByDeletedTrue();

    Page<ProductUserResponseDto> findProductsByFilters(List<Long> categoryIds, List<Long> brandIds, List<Long> colorIds, List<Long> materialIds, List<Long> sizeIds,
                                                       Double minPrice, Double maxPrice,String productName,
                                                       Pageable pageable);

}
