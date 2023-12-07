package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;

import com.poly.springboot.entity.Voucher;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.VoucherMapper;
import com.poly.springboot.repository.VoucherRepository;
import com.poly.springboot.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;


    @Override
    public List<Voucher> findByDeletedTrue() {
        return voucherRepository.findByDeletedTrue();
    }

    @Override
    public Page<Voucher> getVouchers(String code, String name, List<Boolean> status, Pageable pageable) {
        Page<Voucher> rolePage;

        if (name == null && status == null && code == null) {
            rolePage = voucherRepository.findAll(pageable);
        } else if (name == null && code == null) {
            rolePage = voucherRepository.findByDeletedIn(status, pageable);
        } else if (status == null && code == null) {
            rolePage = voucherRepository.findByVoucherNameContaining(name, pageable);
        } else if (status == null && name == null) {
            rolePage = voucherRepository.findByVoucherCodeContaining(code, pageable);
        } else {
            rolePage = voucherRepository.findByVoucherCodeContainingAndVoucherNameContainingAndDeletedIn(code, name,status, pageable);
        }
        return rolePage;
    }

    @Override
    public Boolean createVoucher(VoucherRequestDto voucherRequestDto) {

        Voucher voucher = new Voucher();
        VoucherMapper.mapToVoucherRequest(voucher, voucherRequestDto);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Boolean updateVoucher(VoucherRequestDto voucherRequestDto, Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id giảm giá này!", String.valueOf(id)));
        VoucherMapper.mapToVoucherRequest(voucher, voucherRequestDto);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Boolean deleteVoucher(Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id giảm giá này!", String.valueOf(id)));

        voucher.setDeleted(!voucher.getDeleted());

        voucherRepository.save(voucher);

        return true;
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(id)));
        return voucher;
    }


}
