package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.BestSellingProductResponsesDto;
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
}
