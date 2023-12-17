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



    @Query(value = "select c.id, c.order_date, c.status_id, sum(od.quantity), sum(od.price)" +
            " from orders as c " +
            "left join order_details as od on c.id = od.order_id " +
            "group by c.id, c.order_date, c.status_id", nativeQuery = true)
    List<Order> findAllOrdersWithDetails();

    @Query("SELECT c FROM User c JOIN Order o ON c.id = o.user.id WHERE o.id = :orderId")
    Optional<User> findUserByOrderId(Long orderId);

    @Query("SELECT c FROM Voucher c JOIN Order o ON c.id = o.voucher.id WHERE o.id = :orderId")
    Optional<Voucher> findVoucherByOrderId(Long orderId);

    @Query("SELECT o FROM Order o WHERE o.orderStatus.id = 1 AND o.deleted = true")
    Page<Order> findAllOrderByStatusId(Pageable pageable);

    Page<Order> findAllByDeletedIsTrue(Pageable pageable);
    Page<Order> findAllByOrderStatusIdAndDeletedIsTrue(Long orderStatusId, Pageable pageable);

    @Modifying
    @Query("UPDATE Order o SET o.orderStatus.id = :statusId WHERE o.id = :orderId")
    void updateStatusById(@Param("orderId") Long orderId, Long statusId);

    @Query("SELECT COALESCE(SUM(o.orderTotal), 0) " +
            "FROM Order o " +
            "WHERE MONTH(o.createdAt) = MONTH(CURRENT_DATE) AND YEAR(o.createdAt) = YEAR(CURRENT_DATE) " +
            "AND o.orderStatus.id = 5")
    Double monthlyRevenue();
    @Query("SELECT COALESCE(SUM(o.orderTotal), 0) " +
            "FROM Order o " +
            "WHERE DATE(o.createdAt) = CURRENT_DATE " +
            "AND o.orderStatus.id = 5")
    Double revenueToday();

    @Query("SELECT MONTH(o.createdAt) AS month, COALESCE(SUM(o.orderTotal), 0) AS totalRevenue " +
            "FROM Order o " +
            "WHERE YEAR(o.createdAt) = YEAR(CURRENT_DATE) AND o.orderStatus.id = 5 " +
            "GROUP BY MONTH(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt)")
    List<Map<String, Object>> getRevenueByMonthForCurrentYear();

    @Query("SELECT o.orderStatus.statusName, COUNT(o) " +
            "FROM Order o " +
            "GROUP BY o.orderStatus.statusName")
    List< Object[]> getTotalOrdersByStatus();
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.deleted = true AND o.orderStatus.id = :orderStatusId")
    Page<Order> findAllOrdersByUserId(@Param("userId") Long userId,@Param("orderStatusId") Long orderStatusId,Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.deleted = true")
    Page<Order> findAllOrdersByUserId(@Param("userId") Long userId,Pageable pageable);
}

