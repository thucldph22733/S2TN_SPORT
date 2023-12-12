package com.poly.springboot.controller;


import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.OrderDetailService;
import com.poly.springboot.service.OrderService;
import com.poly.springboot.service.ProductDetailService;
import com.poly.springboot.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/dashboards/")
@Tag(name = "Dashboards")
public class DashboardController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private ProductDetailService productDetailService;
    @Autowired
    private UserService userService;

    @GetMapping("getRevenueByMonthForCurrentYear")
    public ResponseEntity<?> getRevenueByMonthForCurrentYear(){

        List<Map<String, Object>> objects = orderService.getRevenueByMonthForCurrentYear()  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objects);
    }
    //ham thong ke trang thai
    @GetMapping("getTotalOrdersByStatus")
    public ResponseEntity<?> getTotalOrdersByStatus(){

        List<Map<String, Object>> objects = orderService.getTotalOrdersByStatus()  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objects);
    }
    @GetMapping("getTop10BestSellingProducts")
    public ResponseEntity<?> getTop10BestSellingProducts() {
        List<Map<String, Object>> top10BestSellingProducts= productDetailService.getTop10BestSellingProducts();
        return ResponseEntity.status(HttpStatus.OK)
                .body(top10BestSellingProducts);
    }
    @GetMapping("getCountDeletedUsers")
    public ResponseEntity<Integer> getCountDeletedUsers() {

        Integer countDeletedUsersInDateRange = userService.countDeletedUsersInDateRange();
        return ResponseEntity.status(HttpStatus.OK)
                .body(countDeletedUsersInDateRange);

    }

    @GetMapping("getMonthlyRevenue")
    public ResponseEntity<Double> monthlyRevenue(){

        Double monthlyRevenue = orderService.monthlyRevenue()  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(monthlyRevenue);
    }

    @GetMapping("getRevenueToday")
    public ResponseEntity<Double> revenueToday(){

        Double  revenueToday= orderService.revenueToday()  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(revenueToday);
    }
    @GetMapping("getTotalQuantitySoldThisMonth")
    public ResponseEntity<Integer> getTotalQuantitySoldThisMonth(){

        Integer  totalQuantitySoldThisMonth= orderDetailService.getTotalQuantitySoldThisMonth()  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(totalQuantitySoldThisMonth);
    }

}
