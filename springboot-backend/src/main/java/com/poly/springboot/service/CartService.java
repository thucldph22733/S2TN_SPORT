package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CartRequestDto;

public interface CartService {
    Boolean createCart(CartRequestDto cartRequestDto);

}
