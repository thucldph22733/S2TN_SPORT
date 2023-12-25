package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.responseDto.PaymentResponseDto;
import com.poly.springboot.entity.Payment;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PaymentService {

    List<Payment> getPayments();

    PaymentResponseDto createPayment(PaymentRequestDto methodRequestDto) throws UnsupportedEncodingException;

    Boolean updatePayment(PaymentRequestDto methodRequestDto, Long id);

    Boolean deletePayment(Long id);

}
