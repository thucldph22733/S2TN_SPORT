package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.DeliveryRepository;
import com.poly.springboot.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public List<Delivery> getDeliveries() {

        return deliveryRepository.findAll();

    }

    @Override    //Phuong thuc them Delivery
    public Boolean saveDelivery(DeliveryRequestDto deliveryRequestDto) {

        Delivery delivery = new Delivery();

        delivery.setDeliveryName(deliveryRequestDto.getShippingName());
        delivery.setPrice(deliveryRequestDto.getPrice());
        delivery.setDeliveryDescribe(deliveryRequestDto.getShippingDescribe());

        deliveryRepository.save(delivery);

        return true;
    }

    @Override //Phuong thuc cap nhat Delivery
    public Boolean updateDelivery(DeliveryRequestDto deliveryRequestDto, Long id) {

        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("phương thức giao hàng",String.valueOf(id)));

        delivery.setDeliveryName(deliveryRequestDto.getShippingName());
        delivery.setPrice(deliveryRequestDto.getPrice());
        delivery.setDeliveryDescribe(deliveryRequestDto.getShippingDescribe());

        deliveryRepository.save(delivery);

        return true;
    }


    @Override  //Phuong thuc xoa Delivery
    public Boolean deleteDelivery(Long id) {

        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("phương thức vận chuyển",String.valueOf(id)));

        deliveryRepository.deleteById(delivery.getId());
        return true;
    }
}
