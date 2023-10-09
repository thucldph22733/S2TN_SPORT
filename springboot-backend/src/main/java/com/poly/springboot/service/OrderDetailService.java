package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;

import java.util.List;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();

    Order saveOrder(OrderRequestDto orderRequestDto);

    Order updateOrder(OrderRequestDto orderRequestDto);

}
