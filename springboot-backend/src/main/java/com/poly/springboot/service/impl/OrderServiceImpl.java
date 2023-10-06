package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private ShipperRepository shipperRepository;
    private ShippingMethodRepository shippingMethodRepository;
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            ShipperRepository shipperRepository,
                            ShippingMethodRepository shippingMethodRepository,
                            PaymentMethodRepository paymentMethodRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.shipperRepository = shipperRepository;
        this.shippingMethodRepository = shippingMethodRepository;
        this.paymentMethodRepository = paymentMethodRepository;
    }

    @Override
    public List<OrderResponseDto> getOrders() {
        return orderRepository.findAll().stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getOrderDate(),
                        order.getStaff().getFirstName() + " " + order.getStaff().getLastName(),
                        order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName(),
                        order.getShippingMethod().getShippingName(),
                        order.getPaymentMethod().getPaymentName(),
                        order.getShipper().getShipperName(),
                        order.getOrderStatus().getStatusName(),
                        order.getDeliveryDate(),
                        order.getReceivedDate(),
                        order.getNote()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Order saveOrder(OrderRequestDto orderRequestDto) {



        Order order = new Order();
//        order.setOrderStatus();
//        order.setCustomer();
        order.setShipper(shipperRepository.findById(orderRequestDto.getShipperId()).orElse(null));
        order.setPaymentMethod(paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null));
        order.setShippingMethod(shippingMethodRepository.findById(orderRequestDto.getShippingId()).orElse(null));
        order.setOrderStatus(orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null));
        order.setNote(orderRequestDto.getNote());
        return null;
    }

    @Override
    public Order updateOrder(OrderRequestDto orderRequestDto, Long id) {
        return null;
    }
}
