package com.poly.springboot.controller;


import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.service.OrderDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orderDetails/")
@Tag(name = "OrderDetails",description = "( Rest API Hiển thị, thêm, sửa hóa đơn chi tiết )")
@Validated
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // get all order detail rest api
    @GetMapping("getAll")
    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetails(){
        List<OrderDetailResponseDto> orderDetailList = orderDetailService.getOrderDetails();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body( orderDetailList);
    }
    // create order detail rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createOrderDetail(@Valid  @RequestBody OrderDetailRequestDto orderDetailRequestDto) throws Exception {
        Boolean isCreated = orderDetailService.createOrderDetail(orderDetailRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
    //update order detail rest api
    @PutMapping ("update")
    public ResponseEntity<ResponseDto> updateOrderDetail(@Valid @RequestBody OrderDetailRequestDto orderDetailRequestDto, @RequestParam Long id){
        Boolean isUpdated = orderDetailService.updateOrderDetail(orderDetailRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
    @GetMapping("getByOrderId/{orderId}")
    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetailsByOrderId(@PathVariable Long orderId) {
        List<OrderDetailResponseDto> orderDetails = orderDetailService.getOrderDetailsByOrderId(orderId);

        if (orderDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }
    @GetMapping("getByOrderId")
    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetail(@RequestParam Long id) {
        List<OrderDetailResponseDto> orderDetails = orderDetailService.getOrderDetailsByOrderId(id);

        if (orderDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @DeleteMapping("deleteProducts")
    public ResponseEntity<ResponseDto> deleteSize(@RequestParam Long id){
        Boolean isDeleted = orderDetailService.deleteOrderDetail(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
//package com.poly.springboot.controller;
//
//
//import com.poly.springboot.constants.NotificationConstants;
//import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
//import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
//import com.poly.springboot.dto.responseDto.ResponseDto;
//import com.poly.springboot.entity.OrderDetail;
//import com.poly.springboot.service.OrderDetailService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost3000")
//@RestController
//@RequestMapping("/api/v1/orderDetails/")
//@Tag(name = "OrderDetails",description = "( Rest API Hiển thị, thêm, sửa hóa đơn chi tiết )")
//@Validated
//public class OrderDetailController {
//
//    @Autowired
//    private OrderDetailService orderDetailService;
//
//    // get all order detail rest api
//    @GetMapping("getAll")
//    public ResponseEntity<List<OrderDetailResponseDto>> getOrderDetails(){
//        List<OrderDetailResponseDto> orderDetailList = orderDetailService.getOrderDetails();
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body( orderDetailList);
//    }
//    // create order detail rest api
//    @PostMapping("create")
//    public ResponseEntity<ResponseDto> createOrderDetail(@Valid  @RequestBody OrderDetailRequestDto orderDetailRequestDto){
//        Boolean isCreated = orderDetailService.createOrderDetail(orderDetailRequestDto);
//        if (isCreated){
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
//        }else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
//
//    //update order detail rest api
//    @PutMapping ("update")
//    public ResponseEntity<ResponseDto> updateOrderDetail(@Valid @RequestBody OrderDetailRequestDto orderDetailRequestDto, @RequestParam Long id){
//        Boolean isUpdated = orderDetailService.updateOrderDetail( orderDetailRequestDto,id);
//        if (isUpdated){
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
//        }else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
//}
