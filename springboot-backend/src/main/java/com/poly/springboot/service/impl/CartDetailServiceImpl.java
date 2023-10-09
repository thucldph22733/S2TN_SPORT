package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.entity.CartDetail;
import com.poly.springboot.repository.CartDetailRepository;
import com.poly.springboot.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Override
    public List<CartDetailRequestDto> getCartDetails() {
        return null;
    }

    @Override
    public CartDetail saveCartDetail(CartDetailRequestDto cartDetailRequestDto) {
        return null;
    }

    @Override
    public CartDetail updateCartDetail(CartDetailRequestDto cartDetailRequestDto, Long id) {
        return null;
    }

    @Override
    public String deleteCartDetail(Long id) {
        return null;
    }
}
