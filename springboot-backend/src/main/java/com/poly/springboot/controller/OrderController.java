package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.FilterOrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderInStoreRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Order;
import com.poly.springboot.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/orders/")
@Tag(name = "Orders", description = "( Rest API Hiển thị, thêm, sửa, phân trang, tìm kiếm, lọc hóa đơn )")
@Validated
public class OrderController {

    @Autowired
    private OrderService orderService;

    // get all order rest api
    @PostMapping("getAllOrdersAndFilter")
    public ResponseEntity<?> getOrders(@RequestBody FilterOrderRequestDto orderRequestDto) {

            Pageable pageable = PageRequest.of(orderRequestDto.getPageNo(), orderRequestDto.getPageSize());
        Page<Order> orderPage = orderService.getAllOrders(
                orderRequestDto.getOrderStatusName(),
                orderRequestDto.getOrderId(),
                orderRequestDto.getOrderType(),
                orderRequestDto.getStartDate(),
                orderRequestDto.getEndDate(),
                pageable);
        List<Order> orderList = orderPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        orderList,
                        orderPage);
    }
    //ham thong ke doanh thu theo thang


    @GetMapping("findOrderById")
    public ResponseEntity<Order> findOrderById(@RequestParam Long id) {

        Order order = orderService.findOrderById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(order);
    }

    // create order rest api
    @PostMapping("createOrderOnline")
    public ResponseEntity<Order> createOrderOnline(@Valid @RequestBody OrderRequestDto orderRequestDto) {
        Order  order = orderService.createOrderOnline(orderRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(order);
    }
    @PostMapping("createOrderInStore")
    public ResponseEntity<Order> createOrderInStore() {
        Order  order = orderService.createOrderInStore();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(order);
    }
    @PatchMapping("updateOrderVoucher")
    public ResponseEntity<Order> updateOrderVoucher(@RequestParam(required = false) Long orderId,@RequestParam(required = false) String voucherCode) {
        Order  order = orderService.updateOrderVoucher(orderId,voucherCode);
        return ResponseEntity.status(HttpStatus.OK)
                .body(order);
    }
    @PutMapping("updateOrder")
    public ResponseEntity<Order> updateOrder(@RequestBody OrderInStoreRequestDto requestDto) {
        Order  order = orderService.updateOrder(requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(order);
    }
    @PatchMapping("updateOrderUser")
    public ResponseEntity<Order> updateOrderUser(@RequestParam(required = false) Long orderId,@RequestParam(required = false) Long userId) {
        Order  order = orderService.updateOrderUser(orderId,userId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(order);
    }

    @GetMapping("getAllOrderByStatusName")
    public ResponseEntity<List<Order>> getAllOrderByStatusName() {
        List<Order> orderList = orderService.findAllOrderByStatusName();
        return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }

    @GetMapping("getAllOrdersByUserId")
    public ResponseEntity<?> getAllOrdersByUserId(@RequestParam(defaultValue = "0") Integer pageNo,
                                                  @RequestParam(defaultValue = "10") Integer pageSize
                                                 ,@RequestParam(required = false) Long userId,
                                                  @RequestParam(required = false) String statusName) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orderPage = orderService.findAllOrdersByUserId(userId,statusName, pageable);
        List<Order> orderList = orderPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        orderList,
                        orderPage);
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

    @PatchMapping("updateOrderStatus")
    public ResponseEntity<ResponseDto> updateOrderStatus(@RequestBody OrderStatusRequestDto orderStatusRequestDto) {
        Boolean isUpdated = orderService.updateOrderStatus(orderStatusRequestDto);

        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("export-excel")
    public void generateExcelReport(HttpServletResponse response) throws Exception {
        try {
            response.setContentType("application/octet-stream");
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=courses.xls";
            response.setHeader(headerKey, headerValue);

            orderService.generateExcel(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

