package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.PaymentMethodRequestDto;
import com.poly.springboot.entity.PaymentMethod;
import com.poly.springboot.repository.PaymentMethodRepository;
import com.poly.springboot.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Override  //Method get all payment
    public List<PaymentMethod> getPaymentMethods() {

        List<PaymentMethod> paymentMethods = paymentMethodRepository.findAll();
        return paymentMethods;
    }

    @Override  //Method save payment
    public PaymentMethod savePaymentMethod(PaymentMethodRequestDto methodRequestDto) {

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setPaymentName(methodRequestDto.getPaymentName());
        paymentMethod.setPaymentDescribe(methodRequestDto.getPaymentDescribe());

        paymentMethodRepository.save(paymentMethod);

        return paymentMethod;
    }

    @Override  //Method update payment
    public PaymentMethod updatePaymentMethod(PaymentMethodRequestDto methodRequestDto,Long id) {

        PaymentMethod paymentMethod = paymentMethodRepository.findById(id).get();

        paymentMethod.setPaymentName(methodRequestDto.getPaymentName());
        paymentMethod.setPaymentDescribe(methodRequestDto.getPaymentDescribe());

        paymentMethodRepository.save(paymentMethod);

        return paymentMethod;
    }

    @Override  //Method find payment by id
    public PaymentMethod findPaymentMethodById(Long id) {

        Optional<PaymentMethod>  result = paymentMethodRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override  // Method delete payment by id
    public String deletePaymentMethod(Long id) {

        if (paymentMethodRepository.existsById(id)){

            paymentMethodRepository.deleteById(id);
            return "Delete success!";
        }else {

            return "This id was not found: "+id;
        }
    }
}
