package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeliveryService {

    Page<Delivery> getDeliveries(String name, List<Boolean> status, Pageable pageable);

    Boolean createDelivery(DeliveryRequestDto deliveryRequestDto);

    Boolean updateDelivery(DeliveryRequestDto deliveryRequestDto, Long id);

    Boolean deleteDelivery(Long id);
}
