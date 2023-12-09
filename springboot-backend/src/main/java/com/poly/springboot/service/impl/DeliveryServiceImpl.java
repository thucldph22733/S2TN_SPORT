package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.DeliveryRepository;
import com.poly.springboot.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public Page<Delivery> getDeliveries(String name, List<Boolean> status, Pageable pageable) {

        Page<Delivery> DeliveryList;

        if (name == null && status == null){
            DeliveryList = deliveryRepository.findAll(pageable);
        }else if (name == null){
            DeliveryList = deliveryRepository.findByDeletedIn(status,pageable);
        }else if (status == null){
            DeliveryList = deliveryRepository.findByDeliveryNameContaining(name,pageable);
        }else {
            DeliveryList = deliveryRepository.findByDeliveryNameContainingAndDeletedIn(name,status,pageable);
        }
        return DeliveryList;
    }

    @Override    //Phuong thuc them Delivery
    public Boolean createDelivery(DeliveryRequestDto deliveryRequestDto) {

        Delivery delivery = new Delivery();

        delivery.setDeliveryName(deliveryRequestDto.getDeliveryName());
        delivery.setPrice(deliveryRequestDto.getPrice());
        delivery.setDeliveryDescribe(deliveryRequestDto.getDeliveryDescribe());

        if (deliveryRepository.existsByDeliveryName(deliveryRequestDto.getDeliveryName())){
            throw new AlreadyExistsException("Tên phương thức vận chuyển đã tồn tại!");
        }
        deliveryRepository.save(delivery);

        return true;
    }

    @Override //Phuong thuc cap nhat Delivery
    public Boolean updateDelivery(DeliveryRequestDto deliveryRequestDto, Long id) {

        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id phương thức giao hàng này!", String.valueOf(id)));

        delivery.setDeliveryName(deliveryRequestDto.getDeliveryName());
        delivery.setPrice(deliveryRequestDto.getPrice());
        delivery.setDeliveryDescribe(deliveryRequestDto.getDeliveryDescribe());

        deliveryRepository.save(delivery);

        return true;
    }


    @Override  //Phuong thuc xoa Delivery
    public Boolean deleteDelivery(Long id) {

        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id phương thức giao hàng này!", String.valueOf(id)));

        delivery.setDeleted(!delivery.getDeleted());

        deliveryRepository.save(delivery);

        return true;
    }
}
