package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.VoucherFilterRequestDto;
import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface VoucherService {
    List<Voucher> findByDeletedTrue();

    Page<Voucher> getVoucherByFilter(VoucherFilterRequestDto requestDto);

    Boolean createVoucher(VoucherRequestDto requestDto);

    Boolean updateVoucher(VoucherRequestDto requestDto, Long id);

    Boolean deleteVoucher(Long id);

    Voucher findVoucherById(Long id);

    Voucher findByVoucherCode(String code);
}