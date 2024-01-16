package com.poly.springboot.repository;

import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.User;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    @Query("SELECT o FROM Order o WHERE o.orderStatus.statusName = 'Tạo đơn hàng' ")
    List<Order> findAllOrderByStatusName();

    @Query("SELECT o FROM Order o WHERE " +
            " (:orderStatusName IS NULL OR o.orderStatus.statusName = :orderStatusName) " +
            "AND (:orderId IS NULL OR CAST(o.id AS STRING) = :orderId) " +
            "AND (:orderType IS NULL OR o.orderType = :orderType) " +
            "AND (:startDate IS NULL OR o.createdAt >= :startDate) " +
            "AND (:endDate IS NULL OR o.createdAt <= :endDate) " +
            "AND o.orderStatus.statusName <> 'Tạo đơn hàng' " +
            "ORDER BY o.createdAt DESC")
    Page<Order> findAllByStatusNameAndDeletedIsTrue(
            @Param("orderStatusName") String orderStatusName,
            @Param("orderId") String orderId,
            @Param("orderType") String orderType,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);


    @Query("SELECT COALESCE(SUM(o.orderTotal), 0) " +
            "FROM Order o " +
            "WHERE (:startDate IS NULL OR o.createdAt BETWEEN :startDate AND :endDate) " +
            "AND o.orderStatus.statusName = 'Hoàn thành'")
    Double getRevenue(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderStatus.statusName = 'Hoàn thành' " +
            "AND (:startDate IS NULL OR o.createdAt >= :startDate) " +
            "AND (:endDate IS NULL OR o.createdAt <= :endDate)")
    Long countCompletedOrdersInDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    @Query("SELECT MONTH(o.createdAt) AS month, COALESCE(SUM(o.orderTotal), 0) AS totalRevenue " +
            "FROM Order o " +
            "WHERE YEAR(o.createdAt) = YEAR(CURRENT_DATE) AND o.orderStatus.statusName = 'Hoàn thành' " +
            "AND (:year IS NULL OR YEAR(o.createdAt) = :year) " +
            "GROUP BY MONTH(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt)")
    List<Map<String, Object>> getRevenueByMonthForYear(@Param("year") Integer year);

    @Query("SELECT o.orderStatus.statusName, COUNT(o) " +
            "FROM Order o " +
            "WHERE (:startDate IS NULL OR o.createdAt >= :startDate) " +
            "AND (:endDate IS NULL OR o.createdAt <= :endDate) " +
            "GROUP BY o.orderStatus.statusName")
    List<Object[]> getTotalOrdersByStatus(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (:orderStatusName IS NULL OR o.orderStatus.statusName = :orderStatusName ) ORDER BY o.createdAt DESC")
    Page<Order> findAllOrdersByUserId(@Param("userId") Long userId,@Param("orderStatusName") String orderStatusName,Pageable pageable);

}

