package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VoucherService {
    List<VoucherResponseDto> getVouchers();

    Page<Voucher> getPagination(Pageable pageable);

    List<VoucherResponseDto> searchVoucher(Integer pageNo,String keyword);

    Boolean createVoucher(VoucherRequestDto requestDto);

    Boolean updateVoucher(VoucherRequestDto requestDto, Long id);

    Boolean deleteVoucher(Long id);



}