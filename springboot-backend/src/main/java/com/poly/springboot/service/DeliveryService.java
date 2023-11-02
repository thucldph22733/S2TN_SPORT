package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;

import java.util.List;

public interface DeliveryService {

    List<Delivery> getDeliveries();

    Boolean saveDelivery(DeliveryRequestDto deliveryRequestDto);

    Boolean updateDelivery(DeliveryRequestDto deliveryRequestDto, Long id);

    Boolean deleteDelivery(Long id);
}
