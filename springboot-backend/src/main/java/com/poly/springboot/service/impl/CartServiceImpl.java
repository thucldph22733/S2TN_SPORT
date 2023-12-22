package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.CartRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Cart  createCart(CartRequestDto cartRequestDto) {

        Optional<Cart> existingCart = cartRepository.findByUserId(cartRequestDto.getUserId());

        if (existingCart.isPresent()) {
            // Nếu đã có giỏ hàng, trả về giỏ hàng hiện tại của người dùng
            return existingCart.get();
        } else {
            // Nếu chưa có giỏ hàng, tạo mới một giỏ hàng
            User user = userRepository.findById(cartRequestDto.getUserId()).orElse(null);

            if (user != null) {
                Cart newCart = new Cart();
                newCart.setUser(user);
                return cartRepository.save(newCart);
            } else {
                // Xử lý trường hợp người dùng không tồn tại
                throw new ResourceNotFoundException("Người dùng không tồn tại!");
            }
        }
    }
}
