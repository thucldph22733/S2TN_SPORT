//package com.poly.springboot.service.impl;
//
//import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
//import com.poly.springboot.entity.OrderStatus;
//import com.poly.springboot.exception.AlreadyExistsException;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.OrderStatusRepository;
//import com.poly.springboot.service.OrderStatusService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class OrderStatusServiceImpl implements OrderStatusService {
//
//    @Autowired
//    private OrderStatusRepository orderStatusRepository;
//
//    @Override  //Method get all order status
//    public List<OrderStatus> getOrderStatuses() {
//
//        List<OrderStatus> orderStatuses = orderStatusRepository.findAll();
//        return orderStatuses;
//    }
//
//    @Override //Method save order status
//    public Boolean createOrderStatus(OrderStatusRequestDto orderStatusRequestDto) {
//
//        OrderStatus orderStatus = new OrderStatus();
//
//        orderStatus.setStatusName(orderStatusRequestDto.getStatusName());
//        orderStatus.setStatusDescribe(orderStatusRequestDto.getStatusDescribe());
//
//        if (orderStatusRepository.existsByStatusName(orderStatusRequestDto.getStatusName())){
//            throw new AlreadyExistsException("Tên trạng thái đã tồn tại!");
//        }
//        orderStatusRepository.save(orderStatus);
//
//        return true;
//    }
//
//    @Override //Method update order status
//    public Boolean updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto, Long id) {
//
//        OrderStatus orderStatus = orderStatusRepository
//                .findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id trạng thái hóa đơn này!"));
//
//        orderStatus.setStatusName(orderStatusRequestDto.getStatusName());
//        orderStatus.setStatusDescribe(orderStatusRequestDto.getStatusDescribe());
//
//        orderStatusRepository.save(orderStatus);
//
//        return true;
//    }
//
//    @Override //Method delete order status by id
//    public Boolean deleteOrderStatus(Long id) {
//
//        OrderStatus orderStatus = orderStatusRepository
//                .findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id trạng thái hóa đơn này!"));
//
//        orderStatusRepository.deleteById(orderStatus.getId());
//        return true;
//    }
//}
