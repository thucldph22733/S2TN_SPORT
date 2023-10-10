package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.entity.VoucherOrder;
import com.poly.springboot.service.VoucherOrderService;
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
@RequestMapping("/api/v1/")
public class VoucherOrderController {
    @Autowired
    private VoucherOrderService voucherOrderService;

    @PostMapping("create-voucherOrder")
    public ResponseEntity<VoucherOrder> createVoucherOrder(@RequestBody VoucherOrderRequestDto requestDto) {
        VoucherOrder voucherOrder = voucherOrderService.saveVoucherOrder(requestDto);
        return ResponseEntity.ok(voucherOrder);
    }

    @GetMapping("voucherOrders")
    public ResponseEntity<List<VoucherOrder>> getVoucherOrders() {
        List<VoucherOrder> voucherOrders = voucherOrderService.getVoucherOrders();
        return ResponseEntity.ok(voucherOrders);
    }

    @GetMapping("voucherOrder/{id}")
    public ResponseEntity<VoucherOrder> getVoucherOrder(@PathVariable Long id) {
        VoucherOrder voucherOrder = voucherOrderService.findVoucherOrderById(id);
        return ResponseEntity.ok(voucherOrder);
    }

    @PutMapping("update-voucherOrder/{id}")
    public ResponseEntity<VoucherOrder> updateVoucherOrder(@RequestBody VoucherOrderRequestDto positionRequestDto, @PathVariable Long id) {
        VoucherOrder voucherOrder = voucherOrderService.updateVoucherOrder(positionRequestDto, id);
        return ResponseEntity.ok(voucherOrder);
    }

    @DeleteMapping("delete-voucherOrder/{id}")
    public ResponseEntity<String> deleteVoucherOrder(@PathVariable Long id) {
        String message = voucherOrderService.deleteVoucherOrder(id);
        return ResponseEntity.ok(message);
    }

}
