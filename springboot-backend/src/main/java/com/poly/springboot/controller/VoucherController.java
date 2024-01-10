package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.VoucherFilterRequestDto;
import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.service.VoucherService;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/vouchers/")
@Tag(name = "Vouchers", description = "( Rest API Hiển thị, thêm, sửa, xóa giảm giá )")
@Validated
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createVoucher(@Valid @RequestBody VoucherRequestDto voucherRequestDto) {
        Boolean isCreated = voucherService.createVoucher(voucherRequestDto);

        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("findAllVoucherByDeletedTrue")
    public ResponseEntity<List<Voucher>> findAllVoucherByDeletedTrue() {
        List<Voucher> voucherList = voucherService.findByDeletedTrue();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucherList);
    }

    @GetMapping("findByVoucherCode")
    public ResponseEntity<Voucher> findByVoucherCode(@RequestParam String code) {
        Voucher  voucher= voucherService.findByVoucherCode(code);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(voucher);
    }

    @PostMapping("getVoucherByFilter")
    public ResponseEntity<?> getVoucherByFilter(@RequestBody VoucherFilterRequestDto requestDto) {


        Page<Voucher> voucherPage = voucherService.getVoucherByFilter(requestDto);

        List<VoucherResponseDto> voucherResponseDtoList = voucherPage.getContent().stream().map(VoucherResponseDto::new).collect(Collectors.toList());

        return ResponseHandler.generateResponse(HttpStatus.OK, voucherResponseDtoList, voucherPage);
    }



    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateVoucher(@RequestBody VoucherRequestDto voucherRequestDto, @RequestParam Long id) {
        Boolean isUpdated = voucherService.updateVoucher(voucherRequestDto, id);

        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteVoucher(@RequestParam Long id) {
        Boolean isDeleted = voucherService.deleteVoucher(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
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
