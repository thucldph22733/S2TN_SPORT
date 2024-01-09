package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.requestDto.PaymentVNPayRequestDto;
import com.poly.springboot.dto.responseDto.PaymentResponseDto;
import com.poly.springboot.entity.Payment;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PaymentService {



    PaymentResponseDto createPaymentLink(PaymentVNPayRequestDto methodRequestDto) throws UnsupportedEncodingException;

    Boolean createPayment(PaymentRequestDto paymentRequestDto);
    Boolean deletePayment(Long id);

    List<Payment> findByOrdersId(Long orderId);
}
