package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.service.VoucherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vouchers/")
@Tag(name = "Vouchers",description = "( Rest API Hiển thị, thêm, sửa, xóa giảm giá )")
@Validated
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createVoucher(@Valid @RequestBody VoucherRequestDto voucherRequestDto) {
        Boolean isCreated = voucherService.createVoucher(voucherRequestDto);

        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("getAll")
    public ResponseEntity<List<VoucherResponseDto>> getVouchers() {
        List<VoucherResponseDto> voucherResponseDtoList = voucherService.getVouchers();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucherResponseDtoList);
    }

    @GetMapping("pagination")
    public ResponseEntity<List<VoucherResponseDto>> getPagination(@RequestParam Optional<Integer> pageNo) {
        List<VoucherResponseDto> voucherResponseDtoList = voucherService.getPagination(pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucherResponseDtoList);
    }

    @GetMapping("search")
    public ResponseEntity<List<VoucherResponseDto>> searchVoucher(@RequestParam Optional<Integer> pageNo,@RequestParam String keyword) {
        List<VoucherResponseDto> voucherResponseDtoList = voucherService.searchVoucher(pageNo.orElse(0),keyword);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucherResponseDtoList);
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateVoucher(@RequestBody VoucherRequestDto voucherRequestDto, @RequestParam Long id) {
        Boolean isUpdated = voucherService.updateVoucher(voucherRequestDto,id);

        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteVoucher(@RequestParam Long id) {
        Boolean isDeleted = voucherService.deleteVoucher(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("findVoucherById")
    public ResponseEntity<Voucher> findVoucherById(@RequestParam Long id){
        Voucher voucher = voucherService.findVoucherById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucher);
    }

}
