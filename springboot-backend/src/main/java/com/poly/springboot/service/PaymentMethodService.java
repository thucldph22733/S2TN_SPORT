package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentMethodRequestDto;
import com.poly.springboot.entity.PaymentMethod;

import java.util.List;

public interface PaymentMethodService {

    List<PaymentMethod> getPaymentMethods();

    PaymentMethod savePaymentMethod(PaymentMethodRequestDto methodRequestDto);

    PaymentMethod updatePaymentMethod(PaymentMethodRequestDto methodRequestDto,Long id);

    PaymentMethod findPaymentMethodById(Long id);

    String deletePaymentMethod(Long id);

}
