package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.entity.Payment;

import java.util.List;

public interface PaymentService {

    List<Payment> getPayments();

    Payment savePayment(PaymentRequestDto methodRequestDto);

    Payment updatePayment(PaymentRequestDto methodRequestDto, Long id);

    Payment findPaymentById(Long id);

    String deletePayment(Long id);

}
