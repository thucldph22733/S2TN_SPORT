package com.poly.springboot.repository;

import com.poly.springboot.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus,Long> {

    Boolean existsByStatusName(String statusName);
}
