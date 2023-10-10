package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.PaymentMethodRequestDto;
import com.poly.springboot.entity.PaymentMethod;
import com.poly.springboot.service.PaymentMethodService;
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
@RequestMapping("/api/v1/")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService paymentMethodService;

    // get all Payment Method rest api
    @GetMapping("paymentMethods")
    public ResponseEntity<List<PaymentMethod>> getShippingMethods() {

        List<PaymentMethod> responseDtoList = paymentMethodService.getPaymentMethods();
        return ResponseEntity.ok(responseDtoList);
    }

    //get Payment Method by id rest api
    @GetMapping("paymentMethod/{id}")
    public ResponseEntity<PaymentMethod> getShippingMethod(@PathVariable Long id) {

        PaymentMethod paymentMethod = paymentMethodService.findPaymentMethodById(id);
        return ResponseEntity.ok(paymentMethod);
    }

    //create Payment Method rest api
    @PostMapping("create-paymentMethod")
    public ResponseEntity<PaymentMethod> createShippingMethod(@RequestBody PaymentMethodRequestDto methodRequestDto) {

        PaymentMethod paymentMethod = paymentMethodService.savePaymentMethod(methodRequestDto);

        return ResponseEntity.ok(paymentMethod);
    }

    //update Payment Method rest api
    @PutMapping("update-paymentMethod/{id}")
    public ResponseEntity<PaymentMethod> updateShippingMethod(@RequestBody PaymentMethodRequestDto methodRequestDto, @PathVariable Long id) {

        PaymentMethod paymentMethod = paymentMethodService.updatePaymentMethod(methodRequestDto, id);

        return ResponseEntity.ok(paymentMethod);
    }

    //delete Payment Method rest api
    @DeleteMapping("delete-paymentMethod/{id}")
    public ResponseEntity<String> deleteShippingMethod(@PathVariable Long id) {

        String message = paymentMethodService.deletePaymentMethod(id);
        return ResponseEntity.ok(message);
    }
}
