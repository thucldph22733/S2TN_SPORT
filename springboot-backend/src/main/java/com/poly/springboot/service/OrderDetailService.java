package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();
    Integer getTotalQuantitySoldThisMonth();

    Page<OrderDetail> getOrderDetailByOrderId(Long orderId, Pageable pageable);

    Boolean createOrderDetail(OrderDetailRequestDto orderDetailRequestDto) throws Exception;

    Boolean updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto, Long id);

    List<OrderDetailResponseDto> getOrderDetailsByOrderId(Long orderId);

    Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId);

    Boolean deleteOrderDetail(Long id);
}

