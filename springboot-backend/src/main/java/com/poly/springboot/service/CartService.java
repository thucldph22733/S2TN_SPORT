package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.User;

public interface CartService {
    Cart createCart(CartRequestDto cartRequestDto );

}
