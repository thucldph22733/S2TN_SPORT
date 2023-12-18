package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.User;
import com.poly.springboot.repository.CartRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Boolean createCart(CartRequestDto cartRequestDto) {

        User user = userRepository.findById(cartRequestDto.getCustomerId()).orElse(null);

        Cart cart = new Cart();

        cart.setUsers(user);

        cartRepository.save(cart);

        return true;
    }
}
