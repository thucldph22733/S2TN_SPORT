package com.poly.springboot.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.poly.springboot.config.VNPayConfig;
import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.requestDto.PaymentVNPayRequestDto;
import com.poly.springboot.dto.responseDto.PaymentResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/payments/")
@Tag(name = "Payments", description = "( Rest API Hiển thị, thêm, sửa, xóa phương thức thanh toán )")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    //create Payment Method rest api
    @PostMapping("payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentVNPayRequestDto paymentRequestDto) throws UnsupportedEncodingException {
        PaymentResponseDto paymentResponse = paymentService.createPaymentLink(paymentRequestDto);
        return new ResponseEntity<>(paymentResponse, HttpStatus.OK);
    }
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createPayment( @RequestBody PaymentRequestDto paymentRequestDto) {
        Boolean isCreated = paymentService.createPayment(paymentRequestDto);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("getAllPaymentByOrdersId")
    public ResponseEntity< List<Payment>> getAllPaymentByOrdersId(@RequestParam(required = false) Long orderId) {

        List<Payment> paymentList = paymentService.findByOrdersId(orderId);
        return ResponseEntity.status(HttpStatus.OK).body(paymentList);
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deletePayment(@RequestParam Long id){
        Boolean isDeleted = paymentService.deletePayment(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
