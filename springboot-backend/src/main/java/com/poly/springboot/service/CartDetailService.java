package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;

import java.util.List;

public interface CartDetailService {

    List<CartDetailResponseDto> getCartDetails(Long cartId);

    Boolean createCartDetail(CartDetailRequestDto cartDetailRequestDto);

    Boolean updateCartDetail(CartDetailRequestDto cartDetailRequestDto,Long id);

    Boolean deleteCartDetail(Long id);


}
