package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.responseDto.PaymentResponseDto;
import com.poly.springboot.entity.Payment;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PaymentService {

    Payment getPayments(String vnp_Amount,String vnp_OrderInfo, String vnp_PayDate, String vnp_TxnRef
    );


    PaymentResponseDto createPayment(PaymentRequestDto methodRequestDto) throws UnsupportedEncodingException;

    Boolean updatePayment(PaymentRequestDto methodRequestDto, Long id);


}
