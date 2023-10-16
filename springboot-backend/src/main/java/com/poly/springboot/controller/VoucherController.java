package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
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
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @PostMapping("create-voucher")
    public ResponseEntity<Voucher> createVoucher(@RequestBody VoucherRequestDto requestDto) {
        Voucher voucher = voucherService.saveVoucher(requestDto);
        return ResponseEntity.ok(voucher);
    }

    @GetMapping("vouchers")
    public ResponseEntity<List<VoucherResponseDto>> getVouchers() {
        List<VoucherResponseDto> responseDtoList = voucherService.getVouchers();
        return ResponseEntity.ok(responseDtoList);
    }

    @GetMapping("voucher/{id}")
    public ResponseEntity<Voucher> getVoucher(@PathVariable Long id) {
        Voucher voucher = voucherService.findVoucherById(id);
        return ResponseEntity.ok(voucher);
    }

    @PutMapping("update-voucher/{id}")
    public ResponseEntity<Voucher> updateVoucher(@RequestBody VoucherRequestDto positionRequestDto, @PathVariable Long id) {
        Voucher voucher = voucherService.updateVoucher(positionRequestDto, id);
        return ResponseEntity.ok(voucher);
    }

    @DeleteMapping("delete-voucher/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable Long id) {
        String message = voucherService.deleteVoucher(id);
        return ResponseEntity.ok(message);
    }

}
