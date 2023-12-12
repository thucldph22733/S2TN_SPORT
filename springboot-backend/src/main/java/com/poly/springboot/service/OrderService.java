package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderUpdateRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.entity.User;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderService {

//    List<OrderResponseDto> getAllOrdersCompleted();
    Page<Order> getAllOrders(Long orderStatusId, Pageable pageable);
    List<Map<String, Object>>getRevenueByMonthForCurrentYear();
    List<Map<String, Object>> getTotalOrdersByStatus();

    Page<Order> findAllOrderByStatusId(Pageable pageable);

    Boolean createOrder(OrderRequestDto orderRequestDto);

    Boolean deleteOrder(Long id);

    Double monthlyRevenue();

    Double revenueToday();


    List<OrderResponseDto> getAllOrders();

    List<OrderResponseDto> getPagination(Integer pageNo);

    Order findOrderById(Long id);


    Boolean updateOrder(OrderRequestDto orderRequestDto, Long id);

    Boolean updateOrders(OrderRequestDto orderRequestDto, Long id);

    Boolean updateOrdersOnline(OrderRequestDto orderRequestDto, Long id);

//    List<OrderResponseDto> searchOrder(Integer pageNo, String keyword);

    List<SecondOrderResponseDto> getAllOrde();

    User findUserByOrderId(Long orderId);

    Voucher findVoucherByOrderId(Long orderId);

    Boolean updateOrderStatus(Long orderId, OrderUpdateRequestDto orderUpdateRequestDto);

    Boolean updateOrderStatusCancle(Long orderId, OrderUpdateRequestDto orderUpdateRequestDto);

}
