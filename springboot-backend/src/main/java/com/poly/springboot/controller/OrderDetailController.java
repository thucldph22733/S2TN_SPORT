package com.poly.springboot.controller;


import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost3000")
@RestController
@RequestMapping("/api/v1/")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // get all order detail rest api
    @GetMapping("orderDetails")
    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetails(){
        List<OrderDetailResponseDto> orderDetailResponseDtoList = orderDetailService.getOrderDetails();
        return ResponseEntity.ok( orderDetailResponseDtoList);
    }
    // create order detail rest api
    @PostMapping("create-orderDetail")
    public ResponseEntity<OrderDetail> saveOrderDetail(@RequestBody OrderDetailRequestDto orderDetailRequestDto){
        OrderDetail orderDetail = orderDetailService.saveOrderDetail(orderDetailRequestDto);
        return ResponseEntity.ok(orderDetail);
    }

    //update order detail rest api
    @PutMapping ("update-orderDetail/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@RequestBody OrderDetailRequestDto orderDetailRequestDto, @PathVariable Long id){
        OrderDetail orderDetail = orderDetailService.updateOrderDetail(orderDetailRequestDto,id);
        return ResponseEntity.ok(orderDetail);
    }
}
