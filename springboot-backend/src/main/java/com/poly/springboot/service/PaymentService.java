package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.entity.Payment;

import java.util.List;

public interface PaymentService {

    List<Payment> getPayments();

    Boolean createPayment(PaymentRequestDto methodRequestDto);

    Boolean updatePayment(PaymentRequestDto methodRequestDto, Long id);

    Boolean deletePayment(Long id);

}
