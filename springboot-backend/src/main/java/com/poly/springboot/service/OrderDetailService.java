package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderDetail;

import java.util.List;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();

    OrderDetail createOrderDetail(OrderDetailRequestDto orderDetailRequestDto);

    OrderDetail updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto,Long id);

}
