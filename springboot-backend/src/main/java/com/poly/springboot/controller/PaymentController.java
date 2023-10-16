package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // get all Payment  rest api
    @GetMapping("payments")
    public ResponseEntity<List<Payment>> getPayments() {

        List<Payment> responseDtoList = paymentService.getPayments();
        return ResponseEntity.ok(responseDtoList);
    }

    //get Payment  by id rest api
    @GetMapping("payment/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {

        Payment paymentMethod = paymentService.findPaymentById(id);
        return ResponseEntity.ok(paymentMethod);
    }

    //create Payment  rest api
    @PostMapping("create-payment")
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequestDto paymentRequestDto) {

        Payment paymentMethod = paymentService.savePayment(paymentRequestDto);

        return ResponseEntity.ok(paymentMethod);
    }

    //update Payment  rest api
    @PutMapping("update-payment/{id}")
    public ResponseEntity<Payment> updatePayment(@RequestBody PaymentRequestDto paymentRequestDto, @PathVariable Long id) {

        Payment paymentMethod = paymentService.updatePayment(paymentRequestDto, id);

        return ResponseEntity.ok(paymentMethod);
    }

    //delete Payment rest api
    @DeleteMapping("delete-payment/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {

        String message = paymentService.deletePayment(id);
        return ResponseEntity.ok(message);
    }
}
