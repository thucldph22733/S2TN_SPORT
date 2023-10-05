package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.OrderStatus;

import java.util.List;

public interface OrderStatusService {

    List<OrderStatus> getOrderStatuses();

    OrderStatus saveOrderStatus(OrderStatusRequestDto orderStatusRequestDto);

    OrderStatus updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto,Long id);

    OrderStatus findOrderStatusById(Long id);

    String deleteOrderStatus(Long id);
}
