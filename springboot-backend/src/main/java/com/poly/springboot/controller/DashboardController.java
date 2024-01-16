package com.poly.springboot.controller;


import com.poly.springboot.dto.requestDto.DateRequestDto;
import com.poly.springboot.dto.responseDto.Top10SaleResponseDto;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.*;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/dashboards/")
@Tag(name = "Dashboards")
public class DashboardController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;
    @GetMapping("getRevenueByMonthForCurrentYear")
    public ResponseEntity<?> getRevenueByMonthForCurrentYear(@RequestParam(required = false) Integer year){

        List<Map<String, Object>> objects = orderService.getRevenueByMonthForCurrentYear(year)  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objects);
    }
    //ham thong ke trang thai
    @PostMapping("getTotalOrdersByStatus")
    public ResponseEntity<?> getTotalOrdersByStatus(@RequestBody DateRequestDto requestDto){

        List<Map<String, Object>> objects = orderService.getTotalOrdersByStatus(requestDto.getStartDate(), requestDto.getEndDate())  ;
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objects);
    }
    @GetMapping("getTop10BestSellingProducts")
    public ResponseEntity<List<Top10SaleResponseDto> > getTop10BestSellingProducts() {
        List<Top10SaleResponseDto>  top10BestSellingProducts = productService.findTop10BestSellingProducts();
        return ResponseEntity.status(HttpStatus.OK)
                .body(top10BestSellingProducts);
    }
    @PostMapping("deleted-users/count")
    public ResponseEntity<Integer> countDeletedUsersInDateRange(@RequestBody DateRequestDto requestDto) {
        Integer count = userService.countDeletedUsersInDateRange(requestDto.getStartDate(), requestDto.getEndDate());
        return ResponseEntity.ok(count);
    }

    @PostMapping("revenue")
    public ResponseEntity<Double> getRevenue(@RequestBody DateRequestDto requestDto) {
        Double revenue = orderService.getRevenue(requestDto.getStartDate(), requestDto.getEndDate());
        return ResponseEntity.ok(revenue);
    }

    @PostMapping("completed-orders/count")
    public ResponseEntity<Long> countCompletedOrdersInDateRange(@RequestBody DateRequestDto requestDto) {
        Long count = orderService.countCompletedOrdersInDateRange(requestDto.getStartDate(), requestDto.getEndDate());
        return ResponseEntity.ok(count);
    }
    @PostMapping("total-stock-quantity")
    public ResponseEntity<Integer> getTotalStockQuantityInDateRange(@RequestBody DateRequestDto requestDto) {
        Integer totalStockQuantity = productService.getTotalStockQuantityInDateRange(requestDto.getStartDate(), requestDto.getEndDate());
        return ResponseEntity.ok(totalStockQuantity);
    }

}
