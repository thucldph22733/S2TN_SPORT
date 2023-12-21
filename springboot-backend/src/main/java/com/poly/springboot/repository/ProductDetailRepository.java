package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.ColorInfoResponseDto;
import com.poly.springboot.dto.responseDto.PDUpdateResponseDto;
import com.poly.springboot.dto.responseDto.ProductDetailInfoResponseDto;
import com.poly.springboot.dto.responseDto.SizeInfoResponseDto;
import com.poly.springboot.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail,Long> {

    @Query("SELECT pd.id AS productId, pd.product.productName as productName, pd.color.colorName as colorName, pd.size.sizeName as sizeName, " +
            "SUM(od.quantity) AS totalQuantitySold, " +
            "SUM(od.quantity * od.price) AS totalRevenue " +
            "FROM OrderDetail od " +
            "JOIN od.productDetail pd " +
            "GROUP BY productId, productName, colorName, sizeName " +
            "ORDER BY totalQuantitySold DESC " +
            "LIMIT 5")
    List<Map<String, Object>> findTop10BestSellingProducts();

    @Query("SELECT new com.poly.springboot.dto.responseDto.ColorInfoResponseDto(pd.color.id, pd.color.colorName) FROM ProductDetail pd WHERE pd.product.id = :productId GROUP BY pd.color.id, pd.color.colorName")
    List<ColorInfoResponseDto> findColorNamesByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.SizeInfoResponseDto( pd.size.id, pd.size.sizeName) FROM ProductDetail pd WHERE pd.product.id = :productId GROUP BY pd.size.id, pd.size.sizeName")
    List<SizeInfoResponseDto> findSizeNamesByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductDetailInfoResponseDto(p.productName, p.productDescribe, SUM(pd.quantity), MIN(pd.price), c.categoryName, b.brandName) " +
            "FROM ProductDetail pd " +
            "JOIN pd.product p " +
            "JOIN p.category c " +
            "JOIN p.brand b " +
            "WHERE p.id = :productId " +
            "GROUP BY p.productName, p.productDescribe, c.categoryName, b.brandName")
   ProductDetailInfoResponseDto getProductDetailsByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.PDUpdateResponseDto(pd.quantity, pd.price) FROM ProductDetail pd WHERE pd.product.id = :productId AND pd.color.id = :colorId AND pd.size.id = :sizeId")
    PDUpdateResponseDto findQuantityAndPriceByProductIdAndColorIdAndSizeId(
            @Param("productId") Long productId,
            @Param("colorId") Long colorId,
            @Param("sizeId") Long sizeId
    );
}
