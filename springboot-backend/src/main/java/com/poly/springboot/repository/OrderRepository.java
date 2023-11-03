package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

//    List<OrderResponseDto> findOrderByOrderStatus(Long id);
}
