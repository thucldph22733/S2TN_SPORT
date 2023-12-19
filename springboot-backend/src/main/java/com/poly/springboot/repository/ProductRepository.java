package com.poly.springboot.repository;

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

    Page<Product> findByProductNameContaining(String name, Pageable pageable);
    Page<Product> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Product> findByProductNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);

    List<Product> findAllByDeletedTrue();

    @Query(nativeQuery = true, value =
            "SELECT p.id, p.product_name AS productName, i.image_link AS imageUrl, MIN(pd.price) AS minPrice " +
                    "FROM images i " +
                    "JOIN products p ON i.product_id = p.id " +
                    "JOIN product_details pd ON pd.product_id = p.id " +
                    "WHERE i.is_deleted = true " +
                    "AND p.product_hot = true " +
                    "GROUP BY p.id, p.product_name, i.image_link")
    Page<ProductUserResponseDto> findProductHomePageByProductHot(Pageable pageable);
    @Query(nativeQuery = true, value =
            "SELECT p.id, p.product_name AS productName, i.image_link AS imageUrl, MIN(pd.price) AS minPrice " +
                    "FROM images i " +
                    "JOIN products p ON i.product_id = p.id " +
                    "JOIN product_details pd ON pd.product_id = p.id " +
                    "WHERE i.is_deleted = true " +
                    "AND p.product_new = true " +
                    "GROUP BY p.id, p.product_name, i.image_link")
    Page<ProductUserResponseDto> findProductHomePageByProductNew(Pageable pageable);
    @Query(nativeQuery = true, value =
            "SELECT p.id, p.product_name AS productName, i.image_link AS imageUrl, MIN(pd.price) AS minPrice " +
                    "FROM images i " +
                    "JOIN products p ON i.product_id = p.id " +
                    "JOIN product_details pd ON pd.product_id = p.id " +
                    "WHERE i.is_deleted = true " +
                    "AND p.product_sale = true " +
                    "GROUP BY p.id, p.product_name, i.image_link")
    Page<ProductUserResponseDto> findProductHomePageByProductSale(Pageable pageable);

}
