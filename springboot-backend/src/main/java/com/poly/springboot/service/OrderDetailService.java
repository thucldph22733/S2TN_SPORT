package com.poly.springboot.service;

import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;

import java.util.List;

public interface OrderDetailService {

    List<OrderDetailResponseDto> getOrderDetails();

}
