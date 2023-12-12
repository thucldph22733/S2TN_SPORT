package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.TimeLineRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.TimeLineResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.TimeLine;
import com.poly.springboot.repository.OrderRepository;
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

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<TimeLine> findAllTimeLinesByOrderId(Long orderId) {
        return timeLineRepository.findAllByStatusId(orderId);
    }

    @Override
    public TimeLine findByOrderAndStatus(Order order, Integer status) {
        return timeLineRepository.findByOrderAndStatusAndDeletedTrue(order,status);
    }

    @Override
    public List<TimeLine> findByOrderIdAndStatus(Long id) {
        return timeLineRepository.findByOrderIdAndStatus(id);
    }

    @Override
    public Boolean createTimeLine(TimeLineRequestDto timeLineRequestDto) {
        Long orderId = timeLineRequestDto.getOrderId();
        Order order = orderId != null ? orderRepository.findById(orderId).orElse(null) : null;
        TimeLine timeLine = new TimeLine();
        timeLine.setNote(timeLineRequestDto.getNote());
        timeLine.setStatus(timeLineRequestDto.getStatus());
        timeLine.setOrder(order);
        timeLine.setDeleted(true);
        timeLineRepository.save(timeLine);
        return true;
    }


}
