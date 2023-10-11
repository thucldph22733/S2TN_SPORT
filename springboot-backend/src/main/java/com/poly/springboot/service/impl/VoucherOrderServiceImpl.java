package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.VoucherOrderRequestDto;
import com.poly.springboot.entity.VoucherOrder;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.repository.VoucherOrderRepository;
import com.poly.springboot.repository.VoucherRepository;
import com.poly.springboot.service.VoucherOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherOrderServiceImpl implements VoucherOrderService {
    @Autowired
    private VoucherOrderRepository voucherOrderRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VoucherRepository voucherRepository;
    @Override
    public List<VoucherOrder> getVoucherOrders() {
        return voucherOrderRepository.findAll();
    }

    @Override
    public VoucherOrder saveVoucherOrder(VoucherOrderRequestDto requestDto) {
        System.out.println(requestDto);
        VoucherOrder voucherOrder = new VoucherOrder();
        voucherOrder.setVoucher(voucherRepository.findById(requestDto.getVoucherId()).orElse(null));
        voucherOrder.setOrder(orderRepository.findById(requestDto.getOrderId()).orElse(null));
        System.out.println(voucherOrder);
        return voucherOrderRepository.save(voucherOrder);
    }

    @Override
    public VoucherOrder updateVoucherOrder(VoucherOrderRequestDto requestDto, Long id) {
        VoucherOrder voucherOrder = voucherOrderRepository.findById(id).get();
        System.out.println(voucherOrder);
        voucherOrder.setVoucher(voucherRepository.findById(requestDto.getVoucherId()).orElse(null));
        voucherOrder.setOrder(orderRepository.findById(requestDto.getOrderId()).orElse(null));
        voucherOrderRepository.save(voucherOrder);
        return voucherOrder;
    }

    @Override
    public String deleteVoucherOrder(Long id) {
        if (voucherOrderRepository.existsById(id)) {
            voucherOrderRepository.deleteById(id);
            return "Xoá Thành Công";
        } else {
            return "Không tìm thấy id" + id;
        }
    }

    @Override
    public VoucherOrder findVoucherOrderById(Long id) {
        Optional<VoucherOrder> result = voucherOrderRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
}
