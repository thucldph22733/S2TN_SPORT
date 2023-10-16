package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.repository.PaymentRepository;
import com.poly.springboot.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Payment savePayment(PaymentRequestDto paymentRequestDto) {

        Payment payment = new Payment();
        payment.setPaymentName(paymentRequestDto.getPaymentName());
        payment.setPaymentDescribe(paymentRequestDto.getPaymentDescribe());

        paymentRepository.save(payment);

        return payment;
    }

    @Override  //Method update payment
    public Payment updatePayment(PaymentRequestDto paymentRequestDto, Long id) {

        Payment payment = paymentRepository.findById(id).get();

        payment.setPaymentName(paymentRequestDto.getPaymentName());
        payment.setPaymentDescribe(paymentRequestDto.getPaymentDescribe());

        paymentRepository.save(payment);

        return payment;
    }

    @Override  //Method find payment by id
    public Payment findPaymentById(Long id) {

        Optional<Payment>  result = paymentRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override  // Method delete payment by id
    public String deletePayment(Long id) {

        if (paymentRepository.existsById(id)){

            paymentRepository.deleteById(id);
            return "Delete success!";
        }else {

            return "This id was not found: "+id;
        }
    }
}
