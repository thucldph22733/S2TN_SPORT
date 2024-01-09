package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderDetailInStoreRequestDto;
import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();
    Integer getTotalQuantitySoldThisMonth();

    Page<OrderDetailResponseDto> getOrderDetailByOrderId(Long orderId, Pageable pageable);

    Boolean createOrderDetail(OrderDetailInStoreRequestDto orderDetailRequestDto);

    Boolean updateQuantityOrderDetail(Integer quantity, Long id);

    Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId);

    Boolean deleteOrderDetail(Long id);
}

