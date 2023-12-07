package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/payments/")
@Tag(name = "Payments",description = "( Rest API Hiển thị, thêm, sửa, xóa phương thức thanh toán )")
@Validated
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // get all Payment Method rest api
    @GetMapping("getAll")
    public ResponseEntity<List<Payment>> getPayments() {

        List<Payment> paymentList = paymentService.getPayments();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(paymentList);
    }


    //create Payment Method rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createPayment(@Valid @RequestBody PaymentRequestDto paymentRequestDto) {

        Boolean isCreated = paymentService.createPayment(paymentRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.MESSAGE_500,NotificationConstants.STATUS_500));
        }
    }

    //update Payment Method rest api
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updatePayment(@Valid @RequestBody PaymentRequestDto paymentRequestDto, @RequestParam Long id) {

        Boolean isUpdated = paymentService.updatePayment(paymentRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.MESSAGE_500,NotificationConstants.STATUS_500));
        }
    }

    //delete Payment Method rest api
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteShipping(@RequestParam Long id) {

        Boolean isDeleted = paymentService.deletePayment(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.MESSAGE_500,NotificationConstants.STATUS_500));
        }
    }
}
