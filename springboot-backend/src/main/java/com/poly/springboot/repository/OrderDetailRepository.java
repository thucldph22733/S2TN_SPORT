package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    List<OrderDetail> findByOrderId(Long orderId);
    List<OrderDetail> findByOrder(Order order);

    Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId);

    @Query("SELECT COALESCE(SUM(od.price), 0) FROM OrderDetail od WHERE od.order.id = :orderId")
    double calculateOrderTotal(@Param("orderId") Long orderId);
}


