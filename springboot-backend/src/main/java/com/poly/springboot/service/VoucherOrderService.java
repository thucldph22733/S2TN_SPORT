package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.dto.responseDto.VoucherOrderResponseDto;
import com.poly.springboot.entity.VoucherOrder;

import java.util.List;

public interface VoucherOrderService {
    List<VoucherOrderResponseDto> getVoucherOrder();

    VoucherOrder saveVoucherOrder(VoucherOrderRequestDto requestDto);

    VoucherOrder updateVoucherOrder(VoucherOrderRequestDto requestDto, Long id);

    String delete(Long id);

    VoucherOrder findVoucherOrderById(Long id);

}