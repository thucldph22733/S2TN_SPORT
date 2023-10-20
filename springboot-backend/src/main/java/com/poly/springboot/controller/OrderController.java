package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // get all order rest api
    @GetMapping("orders")
    public ResponseEntity<List<OrderResponseDto>> getOrders(){

        List<OrderResponseDto> orderResponseDtoList = orderService.getOrders();
        return ResponseEntity.ok(orderResponseDtoList);
    }

    //phan trang
    @GetMapping("pagination-order/{pageNo}/{pageSize}")
    public ResponseEntity<List<OrderResponseDto>> getPaginationOrder(@PathVariable Integer pageNo,@PathVariable Integer pageSize){
        List<OrderResponseDto> orderResponseDtoList = orderService.getPagination(pageNo,pageSize);
        return ResponseEntity.ok(orderResponseDtoList);
    }

    // save order rest api
    @PostMapping("create-order")
    public ResponseEntity<Order> saveOrder(@RequestBody OrderRequestDto orderRequestDto){
        Order order = orderService.saveOrder(orderRequestDto);
        return ResponseEntity.ok(order);
    }
    // update order rest api
    @PutMapping ("update-order/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody OrderRequestDto orderRequestDto,@PathVariable Long id){
        Order order = orderService.updateOrder(orderRequestDto,id);
        return ResponseEntity.ok(order);
    }
}
