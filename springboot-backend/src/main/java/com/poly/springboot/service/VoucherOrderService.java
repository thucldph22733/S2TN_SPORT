package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.entity.VoucherOrder;

import java.util.List;

public interface VoucherOrderService {
    List<VoucherOrder> getVoucherOrders();

    VoucherOrder saveVoucherOrder(VoucherOrderRequestDto requestDto);

    VoucherOrder updateVoucherOrder(VoucherOrderRequestDto requestDto, Long id);

    String deleteVoucherOrder(Long id);

    VoucherOrder findVoucherOrderById(Long id);

}