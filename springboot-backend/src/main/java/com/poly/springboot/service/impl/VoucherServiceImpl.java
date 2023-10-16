package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.repository.CategoryClubRepository;
import com.poly.springboot.repository.VoucherRepository;
import com.poly.springboot.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public List<VoucherResponseDto> getVouchers() {
        return voucherRepository.findAll().stream().map(
                voucher -> new VoucherResponseDto(
                        voucher.getId(),
                        voucher.getCategoryVoucher(),
                        voucher.getVoucherName(),
                        voucher.getStartDate(),
                        voucher.getEndDate(),
                        voucher.getOrderMinimum(),
                        voucher.getMaxReduce(),
                        voucher.getQuantity(),
                        voucher.getDiscountRate(),
                        voucher.getVoucherDescribe(),
                        voucher.getVoucherStatus()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Voucher saveVoucher(VoucherRequestDto voucherRequestDto) {

        System.out.println(voucherRequestDto);
        Voucher voucher = new Voucher();
        voucher.setCategoryVoucher(voucherRequestDto.getCategoryVoucher());
        voucher.setVoucherName(voucherRequestDto.getVoucherName());
        voucher.setStartDate(voucherRequestDto.getStartDate());
        voucher.setEndDate(voucherRequestDto.getEndDate());
        voucher.setQuantity(voucherRequestDto.getQuantity());
        voucher.setMaxReduce(voucherRequestDto.getMaxReduce());
        voucher.setOrderMinimum(voucherRequestDto.getOrderMinimum());
        voucher.setDiscountRate(voucherRequestDto.getDiscountRate());
        voucher.setVoucherDescribe(voucherRequestDto.getVoucherDescribe());
        voucher.setVoucherStatus(voucherRequestDto.getVoucherStatus());
        System.out.println(voucher);
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(VoucherRequestDto voucherRequestDto, Long id) {
        Voucher voucher = voucherRepository.findById(id).get();
        voucher.setCategoryVoucher(voucherRequestDto.getCategoryVoucher());
        voucher.setVoucherName(voucherRequestDto.getVoucherName());
        voucher.setStartDate(voucherRequestDto.getStartDate());
        voucher.setEndDate(voucherRequestDto.getEndDate());
        voucher.setQuantity(voucherRequestDto.getQuantity());
        voucher.setMaxReduce(voucherRequestDto.getMaxReduce());
        voucher.setOrderMinimum(voucherRequestDto.getOrderMinimum());
        voucher.setDiscountRate(voucherRequestDto.getDiscountRate());
        voucher.setVoucherDescribe(voucherRequestDto.getVoucherDescribe());
        voucher.setVoucherStatus(voucherRequestDto.getVoucherStatus());
        System.out.println(voucher);
        return voucher;
    }

    @Override
    public String deleteVoucher(Long id) {
        if (voucherRepository.existsById(id)) {
            voucherRepository.deleteById(id);
            return "Xoá Thành Công";
        } else {
            return "Không tìm thấy id" + id;
        }
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Optional<Voucher> result = voucherRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
}
