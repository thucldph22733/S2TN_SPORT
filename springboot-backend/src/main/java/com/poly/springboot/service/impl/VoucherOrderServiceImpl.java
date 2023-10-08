package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.dto.responseDto.VoucherOrderResponseDto;
import com.poly.springboot.entity.VoucherOrder;
import com.poly.springboot.repository.VoucherOrderRepository;
import com.poly.springboot.service.VoucherOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VoucherOrderServiceImpl implements VoucherOrderService {
    @Autowired
    private VoucherOrderRepository repository;

    @Override
    public List<VoucherOrderResponseDto> getVoucherOrder() {
        return repository.findAll().stream().map(
                voucher -> new VoucherOrderResponseDto(
                        voucher.getId(),
                        voucher.getOrder(),
                        voucher.getVoucher(),
                        voucher.getCreateDate(),
                        voucher.getUpdateDate()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public VoucherOrder saveVoucherOrder(VoucherOrderRequestDto requestDto) {
        System.out.println(requestDto);
        VoucherOrder voucherOrder = new VoucherOrder();
        voucherOrder.setVoucher(requestDto.getVoucher());
        voucherOrder.setOrder(requestDto.getOrder());
        voucherOrder.setCreateDate(requestDto.getCreateDate());
        voucherOrder.setUpdateDate(requestDto.getUpdateDate());
        System.out.println(voucherOrder);
        return repository.save(voucherOrder);
    }

    @Override
    public VoucherOrder updateVoucherOrder(VoucherOrderRequestDto requestDto, Long id) {
        VoucherOrder voucherOrder = repository.findById(id).get();
        System.out.println(voucherOrder);
        voucherOrder.setVoucher(requestDto.getVoucher());
        voucherOrder.setOrder(requestDto.getOrder());
        voucherOrder.setCreateDate(requestDto.getCreateDate());
        voucherOrder.setUpdateDate(requestDto.getUpdateDate());
        repository.save(voucherOrder);
        return voucherOrder;
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
    public VoucherOrder findVoucherOrderById(Long id) {
        Optional<VoucherOrder> result = repository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
}
