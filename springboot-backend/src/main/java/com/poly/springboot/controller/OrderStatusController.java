//package com.poly.springboot.controller;
//
//import com.poly.springboot.constants.NotificationConstants;
//import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
//import com.poly.springboot.dto.responseDto.ResponseDto;
//import com.poly.springboot.entity.OrderStatus;
//import com.poly.springboot.service.OrderStatusService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
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
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/v1/orderStatus/")
//@Tag(name = "OrderStatus", description = "( Rest API Hiển thị, thêm, sửa, xóa trạng thái hóa đơn )")
//@Validated
//public class OrderStatusController {
//
//    @Autowired
//    private OrderStatusService orderStatusService;
//
//    // get all Order Status rest api
//    @GetMapping("getAll")
//    public ResponseEntity<List<OrderStatus>> getOrderStatuses() {
//
//        List<OrderStatus> orderStatuses = orderStatusService.getOrderStatuses();
//        return ResponseEntity.
//                status(HttpStatus.OK)
//                .body(orderStatuses);
//    }
//
//
//
//    //create Order Status rest api
//    @PostMapping("create")
//    public ResponseEntity<ResponseDto> createOrderStatus(@Valid @RequestBody OrderStatusRequestDto orderStatusRequestDto) {
//
//        Boolean isCreated = orderStatusService.createOrderStatus(orderStatusRequestDto);
//
//        if (isCreated){
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
//        }else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
//
//    //update Order Status rest api
//    @PutMapping("update")
//    public ResponseEntity<ResponseDto> updateOrderStatus(@Valid @RequestBody OrderStatusRequestDto orderStatusRequestDto, @RequestParam Long id) {
//
//        Boolean isUpdated = orderStatusService.updateOrderStatus(orderStatusRequestDto, id);
//
//        if (isUpdated){
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
//        }else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
//
//    //delete Order Status rest api
//    @DeleteMapping("delete")
//    public ResponseEntity<ResponseDto> deleteOrderStatus(@RequestParam Long id) {
//
//        Boolean isDeleted = orderStatusService.deleteOrderStatus(id);
//
//        if (isDeleted){
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
//        }else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
//}
