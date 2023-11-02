package com.poly.springboot.controller;


import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.service.OrderDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost3000")
@RestController
@RequestMapping("/api/orderDetails/")
@Tag(name = "OrderDetails")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // get all order detail rest api
    @GetMapping("getAll")
    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetails(){
        List<OrderDetailResponseDto> orderDetailList = orderDetailService.getOrderDetails();
        return ResponseEntity.ok( orderDetailList);
    }
    // create order detail rest api
    @PostMapping("create")
    public ResponseEntity<OrderDetail> saveOrderDetail(@RequestBody OrderDetailRequestDto orderDetailRequestDto){
        OrderDetail orderDetail = orderDetailService.createOrderDetail(orderDetailRequestDto);
        return ResponseEntity.ok(orderDetail);
    }

    //update order detail rest api
    @PutMapping ("update")
    public ResponseEntity<OrderDetail> updateOrderDetail(@RequestBody OrderDetailRequestDto orderDetailRequestDto, @RequestParam Long id){
        OrderDetail orderDetail = orderDetailService.updateOrderDetail(orderDetailRequestDto,id);
        return ResponseEntity.ok(orderDetail);
    }
}
