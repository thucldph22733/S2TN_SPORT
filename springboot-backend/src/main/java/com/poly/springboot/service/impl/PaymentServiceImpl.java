package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.PaymentRepository;
import com.poly.springboot.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override  //Method get all payment
    public List<Payment> getPayments() {

        List<Payment> payments = paymentRepository.findAll();
        return payments;
    }

    @Override  //Method save payment
    public Boolean createPayment(PaymentRequestDto paymentRequestDto) {

        Payment payment = new Payment();
        payment.setPaymentName(paymentRequestDto.getPaymentName());
        payment.setPaymentDescribe(paymentRequestDto.getPaymentDescribe());

        paymentRepository.save(payment);

        return true;
    }

    @Override  //Method update payment
    public Boolean updatePayment(PaymentRequestDto paymentRequestDto, Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("phương thức thanh toán",String.valueOf(id)));

        payment.setPaymentName(paymentRequestDto.getPaymentName());
        payment.setPaymentDescribe(paymentRequestDto.getPaymentDescribe());

        paymentRepository.save(payment);

        return true;
    }

    @Override  // Method delete payment by id
    public Boolean deletePayment(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("phương thức thanh toán",String.valueOf(id)));

        paymentRepository.deleteById(payment.getId());
        return true;
    }
}
