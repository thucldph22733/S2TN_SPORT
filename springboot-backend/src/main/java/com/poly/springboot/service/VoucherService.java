package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VoucherService {
    List<Voucher> findByDeletedTrue();

    Page<Voucher> getVouchers(String code,String name, List<Boolean> status, Pageable pageable);

    Boolean createVoucher(VoucherRequestDto requestDto);

    Boolean updateVoucher(VoucherRequestDto requestDto, Long id);

    Boolean deleteVoucher(Long id);

    Voucher findVoucherById(Long id);

    Voucher findByVoucherCode(String code);
}