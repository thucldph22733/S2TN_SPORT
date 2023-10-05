package com.poly.springboot.service.impl;

import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.repository.OrderDetailRepository;
import com.poly.springboot.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetailResponseDto> getOrderDetails() {
        return null;
    }
}
