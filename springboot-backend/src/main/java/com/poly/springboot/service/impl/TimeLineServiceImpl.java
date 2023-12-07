package com.poly.springboot.service.impl;

import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.TimeLineResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.TimeLine;
import com.poly.springboot.repository.TimeLineRepository;
import com.poly.springboot.service.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimeLineServiceImpl implements TimeLineService {

    @Autowired
    private TimeLineRepository timeLineRepository;

    @Override
    public List<TimeLineResponseDto> findAllTimeLinesByOrderId(Long orderId) {
        return timeLineRepository.findAllByStatusId(orderId).stream().map(
                o -> new TimeLineResponseDto(
                        o.getId(),
                        o.getNote(),
                        o.getCreateDate(),
                        o.getStatus(),
                        o.getOrder() != null ? o.getOrder().getId() : null,
                        o.getOrder() != null ? o.getOrder().getOrderTotal() : null,
                        o.getOrder() != null && o.getOrder().getStaff() != null ? o.getOrder().getStaff().getStaffName() : null,
                        o.getOrder() != null && o.getOrder().getPayment() != null ? o.getOrder().getPayment().getPaymentName() : null

                )
        ).collect(Collectors.toList());
    }

    @Override
    public TimeLine findByOrderAndStatus(Order order, Integer status) {
        return timeLineRepository.findByOrderAndStatus(order,status);
    }

    @Override
    public List<TimeLineResponseDto> findAllByOrderIdAndStatus(Long orderId) {
        return timeLineRepository.findAllByOrderIdAndStatus(orderId).stream().map(
                o -> new TimeLineResponseDto(
                        o.getId(),
                        o.getNote(),
                        o.getCreateDate(),
                        o.getStatus(),
                        o.getOrder() != null ? o.getOrder().getId() : null,
                        o.getOrder() != null ? o.getOrder().getOrderTotal() : null,
                        o.getOrder() != null && o.getOrder().getStaff() != null ? o.getOrder().getStaff().getStaffName() : null,
                        o.getOrder() != null && o.getOrder().getPayment() != null ? o.getOrder().getPayment().getPaymentName() : null
                )
        ).collect(Collectors.toList());
    }


}
