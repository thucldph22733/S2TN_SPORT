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


}
