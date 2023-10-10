package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ShippingMethodRequestDto;
import com.poly.springboot.entity.ShippingMethod;
import com.poly.springboot.repository.ShippingMethodRepository;
import com.poly.springboot.service.ShippingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShippingMethodServiceImpl implements ShippingMethodService {

    @Autowired
    private ShippingMethodRepository shippingMethodRepository;

    @Override   //Phuong thuoc lay du lieu ShippingMethod
    public List<ShippingMethod> getShippingMethods() {

        return shippingMethodRepository.findAll();

    }

    @Override    //Phuong thuc them ShippingMethod
    public ShippingMethod saveShippingMethod(ShippingMethodRequestDto methodRequestDto) {

        ShippingMethod shippingMethod = new ShippingMethod();

        shippingMethod.setShippingName(methodRequestDto.getShippingName());
        shippingMethod.setPrice(methodRequestDto.getPrice());
        shippingMethod.setShippingDescribe(methodRequestDto.getShippingDescribe());

        shippingMethodRepository.save(shippingMethod);

        return shippingMethod;
    }

    @Override //Phuong thuc cap nhat ShippingMethod
    public ShippingMethod updateShippingMethod(ShippingMethodRequestDto methodRequestDto, Long id) {

        ShippingMethod shippingMethod = shippingMethodRepository.findById(id).get();

        shippingMethod.setShippingName(methodRequestDto.getShippingName());
        shippingMethod.setPrice(methodRequestDto.getPrice());
        shippingMethod.setShippingDescribe(methodRequestDto.getShippingDescribe());

        shippingMethodRepository.save(shippingMethod);

        return shippingMethod;
    }

    @Override  //Phuong thuc tim ShippingMethod bang id
    public ShippingMethod findShippingMethodById(Long id) {

        Optional<ShippingMethod> result = shippingMethodRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override  //Phuong thuc xoa ShippingMethod
    public String deleteShippingMethod(Long id) {

        if (shippingMethodRepository.existsById(id)) {
            shippingMethodRepository.deleteById(id);
            return "Delete success!";
        }else {
            return "This id was not found: "+id;
        }

    }
}
