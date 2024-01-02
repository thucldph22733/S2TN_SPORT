package com.poly.springboot.repository;

import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus,Long> {

    Boolean existsByStatusName(String statusName);

    Optional<OrderStatus> findByStatusName(String statusName);
}
