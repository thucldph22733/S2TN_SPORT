package com.poly.springboot.repository;

import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
    @Query("SELECT o FROM OrderHistory o WHERE o.order.id = :orderId")
    List<OrderHistory> findAllByStatusId(@Param("orderId") Long orderId);

    OrderHistory findByOrderId(Long id);

//    OrderHistory findByOrderAndStatusIdAndDeletedTrue(Order order, Long status);

    @Query("SELECT t FROM OrderHistory t join Order o on t.order.id = o.id WHERE t.order.id = :orderId AND t.status.id = 5")
    List<OrderHistory> findByOrderIdAndStatus(@Param("orderId") Long orderId);

    OrderHistory findByOrderAndStatusId(Order order, Long status);
}
