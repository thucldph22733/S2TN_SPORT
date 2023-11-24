package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;

public class VoucherMapper {

    public static Voucher mapToVoucherRequest(Voucher voucher, VoucherRequestDto voucherRequestDto){

        voucher.setCategoryVoucher(voucherRequestDto.getTypeVoucher());
        voucher.setVoucherName(voucherRequestDto.getVoucherName());
        voucher.setStartDate(voucherRequestDto.getStartDate());
        voucher.setEndDate(voucherRequestDto.getEndDate());
        voucher.setQuantity(voucherRequestDto.getQuantity());
        voucher.setMaxReduce(voucherRequestDto.getMaxReduce());
        voucher.setOrderMinimum(voucherRequestDto.getOrderMinimum());
        voucher.setDiscountRate(voucherRequestDto.getDiscountRate());
        voucher.setVoucherDescribe(voucherRequestDto.getVoucherDescribe());
        voucher.setStatus(voucherRequestDto.getDeleted());

        return voucher;
    }

    public static VoucherResponseDto mapToVoucherResponse(Voucher voucher, VoucherResponseDto voucherResponseDto){

        voucherResponseDto.setCategoryVoucher(voucher.getCategoryVoucher());
        voucherResponseDto.setVoucherName(voucher.getVoucherName());
        voucherResponseDto.setStartDate(voucher.getStartDate());
        voucherResponseDto.setEndDate(voucher.getEndDate());
        voucherResponseDto.setQuantity(voucher.getQuantity());
        voucherResponseDto.setMaxReduce(voucher.getMaxReduce());
        voucherResponseDto.setOrderMinimum(voucher.getOrderMinimum());
        voucherResponseDto.setDiscountRate(voucher.getDiscountRate());
        voucherResponseDto.setVoucherDescribe(voucher.getVoucherDescribe());
        voucherResponseDto.setDeleted(voucher.getStatus());

        return voucherResponseDto;
    }
}
