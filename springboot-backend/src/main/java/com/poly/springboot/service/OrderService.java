package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface OrderService {

//    List<OrderResponseDto> getAllOrdersCompleted();
Page<Order> getAllOrders(String orderStatusName, String orderId, String orderType, LocalDateTime startDate, LocalDateTime endDat, Pageable pageable);
List<Map<String, Object>>getRevenueByMonthForCurrentYear();
    List<Map<String, Object>> getTotalOrdersByStatus();
    List<Order> findAllOrderByStatusName();
    Order createOrderOnline(OrderRequestDto orderRequestDto);
    Order createOrderInStore();
    Boolean deleteOrder(Long id);
    Double monthlyRevenue();
    Double revenueToday();
    Page<Order> findAllOrdersByUserId(Long userId,String orderStatusName, Pageable pageable);
//    Boolean orderCancel (Long id,OrderCancelRequestDto orderCancelRequestDto);

    Boolean updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto);

    Order findOrderById(Long id);

}
