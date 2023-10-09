package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherOrderResponseDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.entity.VoucherOrder;
import com.poly.springboot.service.VoucherOrderService;
import com.poly.springboot.service.VoucherService;
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
@RequestMapping("/api/")
public class VoucherOrderController {
    @Autowired
    private VoucherOrderService service;

    @PostMapping("create-voucher-order")
    public ResponseEntity<VoucherOrder> create(@RequestBody VoucherOrderRequestDto requestDto) {
        VoucherOrder voucherOrder = service.saveVoucherOrder(requestDto);
        return ResponseEntity.ok(voucherOrder);
    }

    @GetMapping("voucher-order")
    public ResponseEntity<List<VoucherOrderResponseDto>> getPosition() {
        List<VoucherOrderResponseDto> responseDtoList = service.getVoucherOrder();
        return ResponseEntity.ok(responseDtoList);
    }

    @GetMapping("voucher-order/{id}")
    public ResponseEntity<VoucherOrder> getPosition(@PathVariable Long id) {
        VoucherOrder voucherOrder = service.findVoucherOrderById(id);
        return ResponseEntity.ok(voucherOrder);
    }

    @PutMapping("update-voucher-order/{id}")
    public ResponseEntity<VoucherOrder> updatePosition(@RequestBody VoucherOrderRequestDto positionRequestDto, @PathVariable Long id) {
        VoucherOrder voucherOrder = service.updateVoucherOrder(positionRequestDto, id);
        return ResponseEntity.ok(voucherOrder);
    }

    @DeleteMapping("delete-voucher-order/{id}")
    public ResponseEntity<String> deletePosition(@PathVariable Long id) {
        String message = service.delete(id);
        return ResponseEntity.ok(message);
    }

}
