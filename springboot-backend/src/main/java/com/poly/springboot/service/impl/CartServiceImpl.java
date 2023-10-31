package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.repository.CartRepository;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository  customerRepository;
    @Override
    public Boolean createCart(CartRequestDto cartRequestDto) {

        Customer customer = customerRepository.findById(cartRequestDto.getCustomerId()).orElse(null);

        Cart cart = new Cart();
        cart.setCustomer(customer);

        cartRepository.save(cart);
        return true;
    }
}
