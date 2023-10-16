package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.OrderStatus;
import com.poly.springboot.service.OrderStatusService;
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
public class OrderStatusController {

    @Autowired
    private OrderStatusService orderStatusService;

    // get all Order Status rest api
    @GetMapping("orderStatuses")
    public ResponseEntity<List<OrderStatus>> getOrderStatuses() {

        List<OrderStatus> orderStatuses = orderStatusService.getOrderStatuses();
        return ResponseEntity.ok(orderStatuses);
    }

    //get Order Status by id rest api
    @GetMapping("orderStatus/{id}")
    public ResponseEntity<OrderStatus> getOrderStatus(@PathVariable Long id) {

        OrderStatus orderStatus = orderStatusService.findOrderStatusById(id);
        return ResponseEntity.ok(orderStatus);
    }

    //create Order Status rest api
    @PostMapping("create-orderStatus")
    public ResponseEntity<OrderStatus> createOrderStatus(@RequestBody OrderStatusRequestDto orderStatusRequestDto) {

        OrderStatus orderStatus= orderStatusService.saveOrderStatus(orderStatusRequestDto);

        return ResponseEntity.ok(orderStatus);
    }

    //update Order Status rest api
    @PutMapping("update-orderStatus/{id}")
    public ResponseEntity<OrderStatus> updateOrderStatus(@RequestBody OrderStatusRequestDto orderStatusRequestDto, @PathVariable Long id) {

        OrderStatus orderStatus = orderStatusService.updateOrderStatus(orderStatusRequestDto, id);

        return ResponseEntity.ok(orderStatus);
    }

    //delete Order Status rest api
    @DeleteMapping("delete-orderStatus/{id}")
    public ResponseEntity<String> deleteOrderStatus(@PathVariable Long id) {

        String message = orderStatusService.deleteOrderStatus(id);
        return ResponseEntity.ok(message);
    }
}
