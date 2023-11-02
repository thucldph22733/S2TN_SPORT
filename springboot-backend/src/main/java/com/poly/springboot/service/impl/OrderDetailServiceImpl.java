package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.repository.OrderDetailRepository;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.repository.ProductDetailRepository;
import com.poly.springboot.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    private OrderDetailRepository orderDetailRepository;
    private ProductDetailRepository productDetailRepository;
    private OrderRepository orderRepository;

    @Autowired
    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository,
                                  ProductDetailRepository productDetailRepository,
                                  OrderRepository orderRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.productDetailRepository = productDetailRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderDetailResponseDto> getOrderDetails() {
        return orderDetailRepository.findAll()
        .stream().map(
                orderDetail -> new OrderDetailResponseDto(
                        orderDetail.getId(),
                        orderDetail.getProductDetail().getProduct().getProductAvatar(),
                        orderDetail.getProductDetail().getColor().getColorName(),
                        orderDetail.getProductDetail().getSize().getSizeName(),
                        orderDetail.getProductDetail().getProduct().getProductName(),
                        orderDetail.getQuantity(),
                        orderDetail.getPrice())
        ).collect(Collectors.toList());
    }

    @Override
    public OrderDetail createOrderDetail(OrderDetailRequestDto orderDetailRequestDto) {
         //find productDetail by id
        ProductDetail productDetail = productDetailRepository.findById(orderDetailRequestDto.getProductDetailId()).orElse(null);
         //find orderRepository by id
        Order order = orderRepository.findById(orderDetailRequestDto.getOrderId()).orElse(null);

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setProductDetail(productDetail);
        orderDetail.setQuantity(orderDetailRequestDto.getQuantity());
        orderDetail.setPrice(orderDetailRequestDto.getPrice());

        orderDetailRepository.save(orderDetail);
        return orderDetail;
    }

    @Override
    public OrderDetail updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto, Long id) {
        //find productDetail by id
        ProductDetail productDetail = productDetailRepository.findById(orderDetailRequestDto.getProductDetailId()).orElse(null);
        //find orderRepository by id
        Order order = orderRepository.findById(orderDetailRequestDto.getOrderId()).orElse(null);

        OrderDetail orderDetail = orderDetailRepository.findById(id).get();
        orderDetail.setOrder(order);
        orderDetail.setProductDetail(productDetail);
        orderDetail.setQuantity(orderDetailRequestDto.getQuantity());
        orderDetail.setPrice(orderDetailRequestDto.getPrice());

        orderDetailRepository.save(orderDetail);
        return orderDetail;
    }

}
