package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.OrderInStoreRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.Order;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface OrderService {

    Page<Order> getAllOrders(String orderStatusName, String orderId, String orderType, LocalDateTime startDate, LocalDateTime endDat, Pageable pageable);
    List<Map<String, Object>>getRevenueByMonthForCurrentYear(Integer year);
    Double getRevenue(LocalDateTime startDate, LocalDateTime endDate);

    Long countCompletedOrdersInDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<Map<String, Object>> getTotalOrdersByStatus(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findAllOrderByStatusName();
    Order createOrderOnline(OrderRequestDto orderRequestDto);

    Order updateOrder(OrderInStoreRequestDto requestDto);
    Order updateOrderVoucher(Long orderId,String voucherCode);
    Order updateOrderUser(Long orderId,Long userId);
    Order createOrderInStore();
    Boolean deleteOrder(Long id);
    Page<Order> findAllOrdersByUserId(Long userId,String orderStatusName, Pageable pageable);
    Boolean updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto);
    Order findOrderById(Long id);
    void generateExcel(HttpServletResponse response) throws IOException;
}
