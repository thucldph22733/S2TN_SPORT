package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.dto.responseDto.ProductFilterResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Boolean existsByProductName(String productName);

    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductFilterResponseDto( " +
            "p.id, p.productName, c.categoryName, b.brandName, s.supplierName, p.productDescribe, COUNT(pd.quantity), p.deleted, p.createdAt, p.createdBy) " +
            "FROM Product p " +
            "JOIN ProductDetail pd ON pd.product.id = p.id " +
            "JOIN Brand b ON b.id = p.brand.id " +
            "JOIN Category c ON c.id = p.category.id " +
            "JOIN Supplier s ON s.id = p.supplier.id " + // Fixed the join condition
            "WHERE (:colorId IS NULL OR pd.color.id = :colorId) " +
            "AND (:sizeId IS NULL OR pd.size.id = :sizeId) " +
            "AND (:materialId IS NULL OR pd.material.id = :materialId) " +
            "AND (:brandId IS NULL OR b.id = :brandId) " +
            "AND (:priceMin IS NULL OR pd.price >= :priceMin) " +
            "AND (:priceMax IS NULL OR pd.price <= :priceMax) " +
            "AND (:categoryId IS NULL OR p.category.id = :categoryId) " +
            "AND ((:keyword IS NULL) OR (p.productName LIKE %:keyword%) OR CAST(p.id AS STRING) = :keyword) " +
            "GROUP BY p.id, p.productName, c.categoryName, b.brandName, s.supplierName, p.productDescribe, p.deleted, p.createdAt, p.createdBy")
    Page<ProductFilterResponseDto> findProductsAdminByFilters(
            @Param("colorId") Long colorId,
            @Param("sizeId") Long sizeId,
            @Param("materialId") Long materialId,
            @Param("brandId") Long brandId,
            @Param("priceMin") Double priceMin,
            @Param("priceMax") Double priceMax,
            @Param("categoryId") Long categoryId,
            @Param("keyword") String keyword,
            Pageable pageable);



    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductUserResponseDto(" +
            "p.id, p.productName, i.imageLink, MIN(pd.price)) " +
            "FROM Image i " +
            "JOIN Product p ON i.product.id = p.id " +
            "JOIN ProductDetail pd ON pd.product.id = p.id " +
            "WHERE i.deleted = true " +
            "GROUP BY p.id, p.productName, i.imageLink")
    Page<ProductUserResponseDto> findProductHomePageByProducts(Pageable pageable);

    @Query("SELECT new com.poly.springboot.dto.responseDto.ProductUserResponseDto( "+
            "p.id , " +
            "p.productName, " +
            "i.imageLink, " +
            "MIN(pd.price) ) " +
            "FROM Image i " +
            "JOIN Product p ON i.product.id = p.id " +
            "JOIN ProductDetail pd ON pd.product.id = p.id " +
            "WHERE i.deleted = true " +
            "AND (:categoryIds IS NULL OR p.category.id IN :categoryIds) " +
            "AND (:brandIds IS NULL OR p.brand.id IN :brandIds) " +
            "AND (:colorIds IS NULL OR pd.color.id IN :colorIds) " +
            "AND (:materialIds IS NULL OR pd.material.id IN :materialIds) " +
            "AND (:sizeIds IS NULL OR pd.size.id IN :sizeIds) " +
            "AND (:productName IS NULL OR p.productName LIKE %:productName%) " +
            "GROUP BY p.id, p.productName, i.imageLink " +
            "HAVING (:minPrice IS NULL OR :minPrice <= MIN(pd.price)) " +
            "AND (:maxPrice IS NULL OR :maxPrice >= MIN(pd.price))")
    Page<ProductUserResponseDto> findProductsByFilters(
            @Param("categoryIds") List<Long> categoryIds,
            @Param("brandIds") List<Long> brandIds,
            @Param("colorIds") List<Long> colorIds,
            @Param("materialIds") List<Long> materialIds,
            @Param("sizeIds") List<Long> sizeIds,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("productName") String productName,
            Pageable pageable);

    List<Product> findAllByDeletedTrue();
}
