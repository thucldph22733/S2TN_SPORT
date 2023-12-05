package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderDetail;

import java.util.List;
import java.util.Optional;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();

    Boolean createOrderDetail(OrderDetailRequestDto orderDetailRequestDto) throws Exception;

    Boolean updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto, Long id);

    List<OrderDetailResponseDto> getOrderDetailsByOrderId(Long orderId);

    Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId);

    Boolean deleteOrderDetail(Long id);
}
