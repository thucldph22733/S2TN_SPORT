package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.dto.responseDto.VoucherResponseDto;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.VoucherMapper;
import com.poly.springboot.repository.VoucherRepository;
import com.poly.springboot.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public List<VoucherResponseDto> getVouchers() {

        return voucherRepository.findAll().stream().map(
                voucher -> VoucherMapper.mapToVoucherResponse(voucher,new VoucherResponseDto())
        ).collect(Collectors.toList());
    }

    @Override
    public List<VoucherResponseDto> getPagination(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo,10);
        List<VoucherResponseDto> voucherResponseDtoList = voucherRepository.findAll(pageable).stream().map(
                voucher -> VoucherMapper.mapToVoucherResponse(voucher,new VoucherResponseDto())
        ).collect(Collectors.toList());
        return voucherResponseDtoList;
    }

    @Override
    public List<VoucherResponseDto> searchVoucher(Integer pageNo, String keyword) {
        Pageable pageable = PageRequest.of(pageNo,10);
        List<VoucherResponseDto> voucherResponseDtoList = voucherRepository.searchVoucher(keyword,pageable).stream().map(
                voucher -> VoucherMapper.mapToVoucherResponse(voucher,new VoucherResponseDto())
        ).collect(Collectors.toList());
        return voucherResponseDtoList;
    }

    @Override
    public Boolean createVoucher(VoucherRequestDto voucherRequestDto) {

        Voucher voucher = new Voucher();
        VoucherMapper.mapToVoucherRequest(voucher,voucherRequestDto);
        voucherRepository.save(voucher);
        return true;
    }

    @Override
    public Boolean updateVoucher(VoucherRequestDto voucherRequestDto, Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("giảm giá",String.valueOf(id)));
        VoucherMapper.mapToVoucherRequest(voucher,voucherRequestDto);
        return true;
    }

    @Override
    public Boolean deleteVoucher(Long id) {

        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("giảm giá",String.valueOf(id)));

        voucherRepository.deleteById(voucher.getId());

        return true;
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(id)));
        return voucher;
    }


}
