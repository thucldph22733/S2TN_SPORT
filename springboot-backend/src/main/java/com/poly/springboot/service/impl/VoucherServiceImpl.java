package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherFilterRequestDto;
import com.poly.springboot.dto.requestDto.VoucherRequestDto;

import com.poly.springboot.entity.Voucher;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.VoucherRepository;
import com.poly.springboot.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public Page<Voucher> getVoucherByFilter(VoucherFilterRequestDto requestDto) {

        Pageable pageable = PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize());

        return voucherRepository
                .getVoucherByFilter(
                        requestDto.getKeyword(),
                        requestDto.getCreatedAtStart(),
                        requestDto.getCreatedAtEnd(),
                        requestDto.getStatus(),
                        pageable);
    }


    @Override
    public Boolean createVoucher(VoucherRequestDto voucherRequestDto) {

        Voucher voucher = new Voucher();
        mapToVoucherRequest(voucher, voucherRequestDto);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Boolean updateVoucher(VoucherRequestDto voucherRequestDto, Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id giảm giá này!"));
        mapToVoucherRequest(voucher, voucherRequestDto);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Boolean deleteVoucher(Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id giảm giá này!"));

        voucher.setDeleted(!voucher.getDeleted());

        voucherRepository.save(voucher);

        return true;
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn"));
        return voucher;
    }

    @Override
    public Voucher findByVoucherCode(String code) {
        return voucherRepository.findByVoucherCode(code);
    }

    private   Voucher mapToVoucherRequest(Voucher voucher, VoucherRequestDto voucherRequestDto){

        voucher.setVoucherCode(voucherRequestDto.getVoucherCode());
        voucher.setVoucherName(voucherRequestDto.getVoucherName());
        voucher.setStartDate(voucherRequestDto.getStartDate());
        voucher.setEndDate(voucherRequestDto.getEndDate());
        voucher.setQuantity(voucherRequestDto.getQuantity());
        voucher.setMaxReduce(voucherRequestDto.getMaxReduce());
        voucher.setOrderMinimum(voucherRequestDto.getOrderMinimum());
        voucher.setDiscountRate(voucherRequestDto.getDiscountRate());
        voucher.setStatus(voucherRequestDto.getStatus());
        voucher.setDeleted(voucherRequestDto.getDeleted());

        return voucher;
    }



}
