package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderHistoryRequestDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderHistory;
import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.repository.OrderHistoryRepository;
import com.poly.springboot.repository.OrderStatusRepository;
import com.poly.springboot.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderHistory> findAllTimeLinesByOrderId(Long orderId) {
        return orderHistoryRepository.findAllByStatusId(orderId);
    }


    @Override
    public OrderHistory findByOrderAndStatusId(Order order, Long status) {
        return orderHistoryRepository.findByOrderAndStatusId(order,status);
    }

    @Override
    public List<OrderHistory> findByOrderIdAndStatus(Long id) {
        return orderHistoryRepository.findByOrderIdAndStatus(id);
    }

    @Override
    public Boolean createTimeLine(OrderHistoryRequestDto orderHistoryRequestDto) {
        Long orderId = orderHistoryRequestDto.getOrderId();
        Long orderStatusId = orderHistoryRequestDto.getStatusId();
        Order order = orderId != null ? orderRepository.findById(orderId).orElse(null) : null;
        OrderStatus orderStatus = orderId != null ? orderStatusRepository.findById(orderStatusId).orElse(null) : null;

        OrderHistory timeLine = new OrderHistory();
        timeLine.setNote(orderHistoryRequestDto.getNote());
        timeLine.setStatus(orderStatus);
        timeLine.setOrder(order);
        orderHistoryRepository.save(timeLine);
        return true;
    }


}
