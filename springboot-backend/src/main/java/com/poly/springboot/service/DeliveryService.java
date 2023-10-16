package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;

import java.util.List;

public interface DeliveryService {

    List<Delivery> getDeliverys();

    Delivery saveDelivery(DeliveryRequestDto methodRequestDto);

    Delivery updateDelivery(DeliveryRequestDto methodRequestDto, Long id);

    Delivery findDeliveryById(Long id);

    String deleteDelivery(Long id);
}
