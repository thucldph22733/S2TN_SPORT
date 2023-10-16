package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;
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

    @Override   //Phuong thuoc lay du lieu Delivery
    public List<Delivery> getDeliverys() {

        return deliveryRepository.findAll();

    }

    @Override    //Phuong thuc them Delivery
    public Delivery saveDelivery(DeliveryRequestDto methodRequestDto) {

        Delivery delivery = new Delivery();

        delivery.setDeliveryName(methodRequestDto.getShippingName());
        delivery.setPrice(methodRequestDto.getPrice());
        delivery.setDeliveryDescribe(methodRequestDto.getShippingDescribe());

        deliveryRepository.save(delivery);

        return delivery;
    }

    @Override //Phuong thuc cap nhat Delivery
    public Delivery updateDelivery(DeliveryRequestDto methodRequestDto, Long id) {

        Delivery delivery = deliveryRepository.findById(id).get();

        delivery.setDeliveryName(methodRequestDto.getShippingName());
        delivery.setPrice(methodRequestDto.getPrice());
        delivery.setDeliveryDescribe(methodRequestDto.getShippingDescribe());

        deliveryRepository.save(delivery);

        return delivery;
    }

    @Override  //Phuong thuc tim Delivery bang id
    public Delivery findDeliveryById(Long id) {

        Optional<Delivery> result = deliveryRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override  //Phuong thuc xoa Delivery
    public String deleteDelivery(Long id) {

        if (deliveryRepository.existsById(id)) {
            deliveryRepository.deleteById(id);
            return "Delete success!";
        }else {
            return "This id was not found: "+id;
        }

    }
}
