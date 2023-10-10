package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.CartDetail;

import java.util.List;

public interface CartDetailService {

    List<CartDetailResponseDto> getCartDetails();

    CartDetail saveCartDetail(CartDetailRequestDto cartDetailRequestDto);

    CartDetail updateCartDetail(CartDetailRequestDto cartDetailRequestDto,Long id);

    String deleteCartDetail(Long id);

}
