package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.CategoryVoucher;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.repository.CategoryVoucherRepository;
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

    @Autowired
    private CategoryVoucherRepository categoryVoucherRepository;
    @Override
    public List<VoucherResponseDto> getVouchers() {
        return voucherRepository.findAll().stream().map(
                voucher -> new VoucherResponseDto(
                        voucher.getId(),
                        voucher.getCategoryVoucher().getCategoryName(),
                        voucher.getVoucherName(),
                        voucher.getStartDate(),
                        voucher.getEndDate(),
                        voucher.getQuantity(),
                        voucher.getReductionLevel(),
                        voucher.getDiscountRate(),
                        voucher.getVoucherDescribe(),
                        voucher.getVoucherStatus(),
                        voucher.getCreateDate(),
                        voucher.getUpdateDate()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Voucher saveVoucher(VoucherRequestDto requestDto) {

        System.out.println(requestDto);
        Voucher voucher = new Voucher();
        voucher.setCategoryVoucher(categoryVoucherRepository.findById(requestDto.getCategoryVoucherId()).orElse(null));
        voucher.setVoucherName(requestDto.getVoucherName());
        voucher.setStartDate(requestDto.getStartDate());
        voucher.setEndDate(requestDto.getEndDate());
        voucher.setQuantity(requestDto.getQuantity());
        voucher.setReductionLevel(requestDto.getReductionLevel());
        voucher.setDiscountRate(requestDto.getDiscountRate());
        voucher.setVoucherDescribe(requestDto.getVoucherDescribe());
        voucher.setVoucherStatus(requestDto.getVoucherStatus());
        System.out.println(voucher);
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(VoucherRequestDto requestDto, Long id) {
        Voucher voucher = voucherRepository.findById(id).get();
        System.out.println(voucher);
        voucher.setCategoryVoucher(categoryVoucherRepository.findById(requestDto.getCategoryVoucherId()).orElse(null));
        voucher.setVoucherName(requestDto.getVoucherName());
        voucher.setStartDate(requestDto.getStartDate());
        voucher.setEndDate(requestDto.getEndDate());
        voucher.setQuantity(requestDto.getQuantity());
        voucher.setReductionLevel(requestDto.getReductionLevel());
        voucher.setDiscountRate(requestDto.getDiscountRate());
        voucher.setVoucherDescribe(requestDto.getVoucherDescribe());
        voucher.setVoucherStatus(requestDto.getVoucherStatus());
        voucherRepository.save(voucher);
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
