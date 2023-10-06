package com.poly.springboot.service.impl;

import com.poly.springboot.entity.Cart;
import com.poly.springboot.repository.CartRepository;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart saveCart(Cart cart) {
        return null;
    }
}
