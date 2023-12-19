package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderHistoryRequestDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderHistory;

import java.util.List;

public interface OrderHistoryService {
    List<OrderHistory> findAllTimeLinesByOrderId(Long orderId);

    OrderHistory findByOrderAndStatusId(Order order, Long status);

    List<OrderHistory> findByOrderIdAndStatus(Long id);

    Boolean createTimeLine(OrderHistoryRequestDto timeLineRequestDto);


}
