package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    List<OrderDetail> findByOrderId(Long orderId);

//    @Query("SELECT od FROM OrderDetail od WHERE od.order.id = :orderId")

    @Query("SELECT new com.poly.springboot.dto.responseDto.OrderDetailResponseDto(" +
            "od.id,i.imageLink, c.colorName, s.sizeName, p.productName, od.quantity, od.price) " +
            "FROM OrderDetail od " +
            "JOIN od.productDetail pd " +
            "JOIN pd.product p " +
            "JOIN pd.color c " +
            "JOIN pd.size s " +
            "JOIN Image i ON i.product.id = p.id AND i.deleted = true " +
            "WHERE od.order.id = :orderId " +
            "ORDER BY od.createdAt DESC ")
    Page<OrderDetailResponseDto> findOrderDetailByOrderId(@Param("orderId") Long orderId, Pageable pageable);

    List<OrderDetail> findByOrder(Order order);

    Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId);

    @Query("SELECT COALESCE(SUM(od.price * od.quantity), 0) FROM OrderDetail od WHERE od.order.id = :orderId")
    double calculateOrderTotal(@Param("orderId") Long orderId);

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od " +
            "JOIN od.productDetail pd " +
            "JOIN pd.product p " +
            "WHERE MONTH(od.order.createdAt) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(od.order.createdAt) = YEAR(CURRENT_DATE())")
    Optional<Integer> getTotalQuantitySoldThisMonth();
}
