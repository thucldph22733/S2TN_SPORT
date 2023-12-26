package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderCancelRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.User;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/orders/")
@Tag(name = "Orders", description = "( Rest API Hiển thị, thêm, sửa, phân trang, tìm kiếm, lọc hóa đơn )")
@Validated
public class OrderController {

    @Autowired
    private OrderService orderService;

    // get all order rest api
    @GetMapping("getAll")
    public ResponseEntity<?> getOrders(@RequestParam(defaultValue = "0") Integer pageNo,
                                       @RequestParam(defaultValue = "10") Integer pageSize,
                                       @RequestParam(required = false) Long orderStatusId) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orderPage = orderService.getAllOrders(orderStatusId, pageable);
        List<Order> orderList = orderPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        orderList,
                        orderPage);
    }
    //ham thong ke doanh thu theo thang

    @GetMapping("getAllList")
    public ResponseEntity<List<SecondOrderResponseDto>> getOrderList() {

        List<SecondOrderResponseDto> orderResponseDtoList = orderService.getAllOrde();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(orderResponseDtoList);
    }

    @GetMapping("findOrderById")
    public ResponseEntity<Order> findOrderById(@RequestParam Long id) {

        Order order = orderService.findOrderById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(order);
    }



    // create order rest api
    @PostMapping("create")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequestDto orderRequestDto) {
        System.out.println(orderRequestDto);
        Order  order = orderService.createOrder(orderRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(order);
    }

    @GetMapping("getAllOrderByStatusId")
    public ResponseEntity<?> getAllOrderByStatusId(@RequestParam(defaultValue = "0") Integer pageNo,
                                                   @RequestParam(defaultValue = "10") Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orderPage = orderService.findAllOrderByStatusId(pageable);
        List<Order> orderList = orderPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        orderList,
                        orderPage);
    }

    @GetMapping("getAllOrdersByUserId")
    public ResponseEntity<?> getAllOrdersByUserId(@RequestParam(defaultValue = "0") Integer pageNo,
                                                  @RequestParam(defaultValue = "10") Integer pageSize
                                                 ,@RequestParam(required = false) Long userId,
                                                  @RequestParam(required = false) Long orderStatusId) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orderPage = orderService.findAllOrdersByUserId(userId,orderStatusId, pageable);
        List<Order> orderList = orderPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        orderList,
                        orderPage);
    }
    @PatchMapping("orderCancel")
    public ResponseEntity<ResponseDto> orderCancel(@RequestBody OrderCancelRequestDto orderCancelRequestDto, @RequestParam Long id) {
        Boolean isCancel = orderService.orderCancel(id,orderCancelRequestDto);
        if (isCancel) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteOrder(@RequestParam Long id) {
        Boolean isDelete = orderService.deleteOrder(id);
        if (isDelete) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    //     update order rest api
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateOrder(@Valid @RequestBody OrderRequestDto orderRequestDto, @RequestParam Long id) {
        Boolean isUpdated = orderService.updateOrder(orderRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("updateOrderStatus")
    public ResponseEntity<ResponseDto> updateOrderStatus(@Valid @RequestBody OrderCancelRequestDto orderUpdateRequestDto, @RequestParam Long id) {
        Boolean isUpdated = orderService.updateOrderStatus(id, orderUpdateRequestDto);

        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("updateOrderStatusCancle")
    public ResponseEntity<ResponseDto> updateOrderStatusCancle(@Valid @RequestBody OrderCancelRequestDto orderUpdateRequestDto, @RequestParam Long id) {
        Boolean isUpdated = orderService.updateOrderStatusCancle(id, orderUpdateRequestDto);

        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("updateTimeLine")
    public ResponseEntity<ResponseDto> updateOrderTimeLine(@Valid @RequestBody OrderRequestDto orderRequestDto, @RequestParam Long id) {
        Boolean isUpdated = orderService.updateOrders(orderRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("updateTimeLine2")
    public ResponseEntity<ResponseDto> updateOrderTimeLine2(@Valid @RequestBody OrderRequestDto orderRequestDto, @RequestParam Long id) {
        Boolean isUpdated = orderService.updateOrdersOnline(orderRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("findCustomerByOrderId")
    public ResponseEntity<User> getCustomerByOrderId(@RequestParam Long id) {
        User user = orderService.findUserByOrderId(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(user);
    }

    @GetMapping("findVoucherByOrderId")
    public ResponseEntity<Voucher> getVoucherByOrderId(@RequestParam Long id) {
        Voucher voucher = orderService.findVoucherByOrderId(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucher);
    }
}

