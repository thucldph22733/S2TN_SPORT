package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<OrderResponseDto> getOrders() {
        return null;
    }

    @Override
    public Order saveOrder(OrderRequestDto orderRequestDto) {
        return null;
    }

    @Override
    public Order updateOrder(OrderRequestDto orderRequestDto, Long id) {
        return null;
    }
}
