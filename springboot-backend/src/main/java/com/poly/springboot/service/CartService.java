package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.Cart;

import java.util.List;

public interface CartService {
    Boolean createCart(CartRequestDto cartRequestDto );

    List<CartDetailResponseDto> getAllCartDetailByCartId(Long userId);

    Cart findCartByUserId(Long userId);

    Boolean updateCartDetail(Integer quantity,Long id);

    Boolean deleteCartDetail(Long id);

}
