package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.repository.OrderStatusRepository;
import com.poly.springboot.service.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override  //Method get all order status
    public List<OrderStatus> getOrderStatuses() {

        List<OrderStatus> orderStatuses = orderStatusRepository.findAll();
        return orderStatuses;
    }

    @Override //Method save order status
    public OrderStatus saveOrderStatus(OrderStatusRequestDto orderStatusRequestDto) {

        OrderStatus orderStatus = new OrderStatus();
        orderStatus.setStatusName(orderStatusRequestDto.getStatusName());
        orderStatus.setStatusDescribe(orderStatusRequestDto.getStatusDescribe());

        orderStatusRepository.save(orderStatus);

        return orderStatus;
    }

    @Override //Method update order status
    public OrderStatus updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto, Long id) {

        OrderStatus orderStatus = orderStatusRepository.findById(id).get();

        orderStatus.setStatusName(orderStatusRequestDto.getStatusName());
        orderStatus.setStatusDescribe(orderStatusRequestDto.getStatusDescribe());

        orderStatusRepository.save(orderStatus);

        return orderStatus;
    }

    @Override //Method get order status by id
    public OrderStatus findOrderStatusById(Long id) {

        Optional<OrderStatus> result = orderStatusRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override //Method delete order status by id
    public String deleteOrderStatus(Long id) {
        if (orderStatusRepository.existsById(id)){

            orderStatusRepository.deleteById(id);
            return "Delete success!";
        }else {

            return "This id was not found: "+id;
        }
    }
}
