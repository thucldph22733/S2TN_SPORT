package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;

public interface CartService {

    Cart saveCart(CartRequestDto cartRequestDto);

}
