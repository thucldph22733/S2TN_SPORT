package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.Order;

import java.util.List;

public interface OrderService {

    List<OrderResponseDto> getOrders();

    Order saveOrder(OrderRequestDto orderRequestDto);

    Order updateOrder(OrderRequestDto orderRequestDto,Long id);

    List<OrderResponseDto> getPagination(Integer pageNo,Integer pageSize);



}
