package com.poly.springboot.repository;

import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.User;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    //    List<OrderResponseDto> findOrderByOrderStatus(Long id);
//    @Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
//    List<Order> findLatestOrders(Pageable pageable);


    @Query(value = "select c.id, c.order_date, c.status_id, sum(od.quantity), sum(od.price)" +
            " from orders as c " +
            "left join order_details as od on c.id = od.order_id " +
            "group by c.id, c.order_date, c.status_id",nativeQuery = true)
    List<Order> findAllOrdersWithDetails();

    @Query("SELECT c FROM User c JOIN Order o ON c.id = o.user.id WHERE o.id = :orderId")
    Optional<User> findUserByOrderId(Long orderId);

    @Query("SELECT c FROM Voucher c JOIN Order o ON c.id = o.voucher.id WHERE o.id = :orderId")
    Optional<Voucher> findVoucherByOrderId(Long orderId);

    @Query("SELECT o FROM Order o WHERE o.orderStatus.id = 1 AND o.deleted = true" )
    Page<Order> findAllOrderByStatusId(Pageable pageable);

}

