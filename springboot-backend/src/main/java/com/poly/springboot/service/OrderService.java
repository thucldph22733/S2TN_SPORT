package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Voucher;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderResponseDto> getAllOrdersCompleted();
    List<OrderResponseDto> getAllOrders();

    List<OrderResponseDto> getPagination(Integer pageNo);

    Order findOrderById(Long id);

//    List<OrderResponseDto> getOrderByStatus(Long id);

    Boolean createOrder(OrderRequestDto orderRequestDto);

    Boolean updateOrder(OrderRequestDto orderRequestDto,Long id);

//    List<OrderResponseDto> searchOrder(Integer pageNo,String keyword);

    List<SecondOrderResponseDto> getAllOrde();

    Customer findCustomerByOrderId(Long orderId);
    Voucher findVoucherByOrderId(Long orderId);

}
//package com.poly.springboot.service;
//
//import com.poly.springboot.dto.requestDto.OrderRequestDto;
//import com.poly.springboot.dto.responseDto.OrderResponseDto;
//import com.poly.springboot.entity.Order;
//
//import java.util.List;
//
//public interface OrderService {
//
//    List<OrderResponseDto> getOrders();
//
//    List<OrderResponseDto> getPagination(Integer pageNo);
//
//    Order findOrderById(Long id);
//
////    List<OrderResponseDto> getOrderByStatus(Long id);
//
//    Boolean createOrder(OrderRequestDto orderRequestDto);
//
//    Boolean updateOrder(OrderRequestDto orderRequestDto,Long id);
//
////    List<OrderResponseDto> searchOrder(Integer pageNo,String keyword);
//
//
//
//}
