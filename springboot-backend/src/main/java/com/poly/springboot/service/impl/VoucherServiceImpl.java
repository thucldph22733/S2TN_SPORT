package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
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
    private VoucherRepository repository;

    @Override
    public List<VoucherResponseDto> getVoucher() {
        return repository.findAll().stream().map(
                voucher -> new VoucherResponseDto(
                        voucher.getId(),
                        voucher.getCategoryVoucher(),
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
        voucher.setCategoryVoucher(requestDto.getCategoryVoucher());
        voucher.setVoucherName(requestDto.getVoucherName());
        voucher.setStartDate(requestDto.getStartDate());
        voucher.setEndDate(requestDto.getEndDate());
        voucher.setQuantity(requestDto.getQuantity());
        voucher.setReductionLevel(requestDto.getReductionLevel());
        voucher.setDiscountRate(requestDto.getDiscountRate());
        voucher.setVoucherDescribe(requestDto.getVoucherDescribe());
        voucher.setVoucherStatus(requestDto.getVoucherStatus());
        voucher.setCreateDate(requestDto.getCreateDate());
        voucher.setUpdateDate(requestDto.getUpdateDate());
        System.out.println(voucher);
        return repository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(VoucherRequestDto requestDto, Long id) {
        Voucher voucher = repository.findById(id).get();
        System.out.println(voucher);
        voucher.setCategoryVoucher(requestDto.getCategoryVoucher());
        voucher.setVoucherName(requestDto.getVoucherName());
        voucher.setStartDate(requestDto.getStartDate());
        voucher.setEndDate(requestDto.getEndDate());
        voucher.setQuantity(requestDto.getQuantity());
        voucher.setReductionLevel(requestDto.getReductionLevel());
        voucher.setDiscountRate(requestDto.getDiscountRate());
        voucher.setVoucherDescribe(requestDto.getVoucherDescribe());
        voucher.setVoucherStatus(requestDto.getVoucherStatus());
        voucher.setCreateDate(requestDto.getCreateDate());
        voucher.setUpdateDate(requestDto.getUpdateDate());
        repository.save(voucher);
        return voucher;
    }

    @Override
    public String delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Xoá Thành Công";
        } else {
            return "Không tìm thấy id" + id;
        }
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Optional<Voucher> result = repository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
}
