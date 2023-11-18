package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/orders/")
@Tag(name = "Orders",description = "( Rest API Hiển thị, thêm, sửa, phân trang, tìm kiếm, lọc hóa đơn )")
@Validated
public class OrderController {

    @Autowired
    private OrderService orderService;

    // get all order rest api
    @GetMapping("getAll")
    public ResponseEntity<List<OrderResponseDto>> getOrders(){

        List<OrderResponseDto> orderResponseDtoList = orderService.getOrders();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(orderResponseDtoList);
    }

    @GetMapping("findOrderById")
    public ResponseEntity<Order> findOrderById(@RequestParam Long id){

        Order order = orderService.findOrderById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(order);
    }
    //phan trang
    @GetMapping("pagination")
    public ResponseEntity<List<OrderResponseDto>> getPaginationOrder(@RequestParam Optional<Integer> pageNo, @RequestParam Integer pageSize){
        List<OrderResponseDto> orderResponseDtoList = orderService.getPagination(pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(orderResponseDtoList);
    }

    // create order rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createOrder(@Valid @RequestBody OrderRequestDto orderRequestDto){
        Boolean isCreated = orderService.createOrder(orderRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
//     update order rest api
    @PutMapping ("update")
    public ResponseEntity<ResponseDto> updateOrder(@Valid @RequestBody OrderRequestDto orderRequestDto,@RequestParam Long id){
        Boolean isUpdated = orderService.updateOrder(orderRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
