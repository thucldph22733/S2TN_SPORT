package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.MaterialInfoResponseDto;
import com.poly.springboot.dto.responseDto.*;
import com.poly.springboot.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail,Long> {

//    @Query("SELECT pd.id AS productId, pd.product.productName as productName, pd.color.colorName as colorName, pd.size.sizeName as sizeName, " +
//            "SUM(od.quantity) AS totalQuantitySold, " +
//            "SUM(od.quantity * od.price) AS totalRevenue " +
//            "FROM OrderDetail od " +
//            "JOIN od.productDetail pd " +
//            "GROUP BY productId, productName, colorName, sizeName " +
//            "ORDER BY totalQuantitySold DESC " +
//            "LIMIT 10")
//    List<Map<String, Object>> findTop10BestSellingProducts();

    @Query("SELECT new com.poly.springboot.dto.responseDto.ColorInfoResponseDto(pd.color.id, pd.color.colorName) " +
            "FROM ProductDetail pd WHERE pd.product.id = :productId " +
            "GROUP BY pd.color.id, pd.color.colorName")
    List<ColorInfoResponseDto> findColorNamesByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.MaterialInfoResponseDto(pd.material.id, pd.material.materialName) " +
            "FROM ProductDetail pd WHERE pd.product.id = :productId " +
            "GROUP BY pd.material.id, pd.material.materialName")
    List<MaterialInfoResponseDto> findMaterialNamesByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.SizeInfoResponseDto( pd.size.id, pd.size.sizeName) " +
            "FROM ProductDetail pd WHERE pd.product.id = :productId " +
            "GROUP BY pd.size.id, pd.size.sizeName")
    List<SizeInfoResponseDto> findSizeNamesByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductDetailInfoResponseDto(p.productName, p.productDescribe, SUM(pd.quantity), MIN(pd.price), c.categoryName, b.brandName) " +
            "FROM ProductDetail pd " +
            "JOIN pd.product p " +
            "JOIN p.category c " +
            "JOIN p.brand b " +
            "WHERE p.id = :productId " +
            "GROUP BY p.productName, p.productDescribe, c.categoryName, b.brandName " )
   ProductDetailInfoResponseDto getProductDetailsByProductId(@Param("productId") Long productId);

    @Query("SELECT new com.poly.springboot.dto.responseDto.PDUpdateResponseDto(pd.id,pd.quantity, pd.price) " +
            "FROM ProductDetail pd " +
            "WHERE pd.product.id = :productId " +
            "AND pd.color.id = :colorId " +
            "AND pd.material.id = :materialId " +
            "AND pd.size.id = :sizeId")
    PDUpdateResponseDto findProductDetail(
            @Param("productId") Long productId,
            @Param("colorId") Long colorId,
            @Param("materialId") Long materialId,
            @Param("sizeId") Long sizeId
    );
    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductDetailResponseDto(" +
            "pd.id, p.productName, i.imageLink, c.colorName, s.sizeName, m.materialName, pd.quantity, pd.price, pd.deleted) " +
            "FROM ProductDetail pd " +
            "JOIN pd.product p " +
            "JOIN pd.color c " +
            "JOIN pd.size s " +
            "JOIN pd.material m " +
            "JOIN Image i ON i.product.id = p.id AND i.deleted = true " +
            "WHERE (:colorId IS NULL OR pd.color.id = :colorId) " +
            "AND (:sizeId IS NULL OR pd.size.id = :sizeId) " +
            "AND (:materialId IS NULL OR pd.material.id = :materialId) " +
            "AND (:brandId IS NULL OR p.brand.id = :brandId) " +
            "AND (:priceMin IS NULL OR pd.price >= :priceMin) " +
            "AND (:priceMax IS NULL OR pd.price <= :priceMax) " +
            "AND (:categoryId IS NULL OR p.category.id = :categoryId) " +
            "AND ((:keyword IS NULL) OR (p.productName LIKE %:keyword%) OR CAST(p.id AS STRING) = :keyword) " +
            "AND pd.deleted = true " +
            "ORDER BY pd.createdAt DESC")
    Page<ProductDetailResponseDto> getProductDetails(
            @Param("colorId") Long colorId,
            @Param("sizeId") Long sizeId,
            @Param("materialId") Long materialId,
            @Param("brandId") Long brandId,
            @Param("priceMin") Double priceMin,
            @Param("priceMax") Double priceMax,
            @Param("categoryId") Long categoryId,
            @Param("keyword") String keyword,
            Pageable pageable);

    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductDetailResponseDto(  pd.id, p.productName,i.imageLink, c.colorName,s.sizeName,m.materialName,pd.quantity,pd.price, pd.deleted )" +
            "from ProductDetail pd " +
            "join Product p on pd.product.id = p.id " +
            "join Image i on i.product.id = p.id " +
            "join Color c on pd.color.id  = c.id " +
            "join Size s on pd.size.id = s.id " +
            "join Material m on pd.material.id = m.id " +
            "where pd.product.id = :productId " +
            "and i.deleted = true " +
            "group by pd.id, i.imageLink, p.productName, c.colorName, m.materialName,s.sizeName,pd.quantity,pd.price, pd.deleted "+
            "ORDER BY pd.createdAt DESC")
    Page<ProductDetailResponseDto> findAllByProductId(@Param("productId") Long productId,Pageable pageable);

    ProductDetail findProductDetailById (Long productId);


}
