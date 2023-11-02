package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.OrderStatus;

import java.util.List;

public interface OrderStatusService {

    List<OrderStatus> getOrderStatuses();

    Boolean createOrderStatus(OrderStatusRequestDto orderStatusRequestDto);

    Boolean updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto,Long id);

    Boolean deleteOrderStatus(Long id);
}
