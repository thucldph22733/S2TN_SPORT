package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.User;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderService {

//    List<OrderResponseDto> getAllOrdersCompleted();
    Page<Order> getAllOrders(Long orderStatusId, Pageable pageable);


    List<OrderResponseDto> getAllOrders();
    List<Map<String, Object>>getRevenueByMonthForCurrentYear();

    List<Map<String, Object>> getTotalOrdersByStatus();

    List<OrderResponseDto> getPagination(Integer pageNo);

    Order findOrderById(Long id);


    Page<Order> findAllOrderByStatusId(Pageable pageable);

    Boolean createOrder(OrderRequestDto orderRequestDto);

    Boolean deleteOrder(Long id);

    Boolean updateOrder(OrderRequestDto orderRequestDto, Long id);

    Boolean updateOrders(OrderRequestDto orderRequestDto, Long id);


    List<SecondOrderResponseDto> getAllOrde();

    User findUserByOrderId(Long orderId);

    Voucher findVoucherByOrderId(Long orderId);

}
