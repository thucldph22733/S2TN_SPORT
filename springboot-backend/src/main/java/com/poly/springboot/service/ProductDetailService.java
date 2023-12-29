package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.*;
import com.poly.springboot.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ProductDetailService {
    Page<ProductDetailResponseDto> getProductDetails(Pageable pageable);

    Boolean deleteProductDetail(Long id);

    Boolean updateProductDetail(ProductDetailRequestDto productDetailRequestDto, Long id);

    List<Map<String, Object>> getTop10BestSellingProducts();

    List<SizeInfoResponseDto> getSizeNamesByProductId(Long productId);

    List<ColorInfoResponseDto> getColorNamesByProductId(Long productId);

    ProductDetail findByIdProductDetailsId(Long id);

    Boolean createProductDetails(List<ProductDetailRequestDto> productDetailRequestDtos);

    ProductDetailInfoResponseDto getProductDetailsByProductId(Long productId);
    PDUpdateResponseDto findQuantityAndPriceByProductIdAndColorIdAndSizeId(
            Long productId,
            Long colorId,
            Long sizeId
    );

}
