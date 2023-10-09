package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.entity.CartDetail;

import java.util.List;

public interface CartDetailService {

    List<CartDetailRequestDto> getCartDetails();

    CartDetail saveCartDetail(CartDetailRequestDto cartDetailRequestDto);

    CartDetail updateCartDetail(CartDetailRequestDto cartDetailRequestDto,Long id);

    String deleteCartDetail(Long id);

}
