package com.poly.springboot.service;

import com.poly.springboot.dto.responseDto.TimeLineResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.TimeLine;

import java.util.List;

public interface TimeLineService {
    List<TimeLineResponseDto> findAllTimeLinesByOrderId(Long orderId);

    TimeLine findByOrderAndStatus(Order order, Integer status);

    List<TimeLineResponseDto> findAllByOrderIdAndStatus(Long orderId);
}
