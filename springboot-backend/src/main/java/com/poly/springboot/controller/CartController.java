package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CartController {

    @Autowired
    private CartService cartService;
    // create cart detail rest api
    @PostMapping("create-cart")
    public ResponseEntity<Cart> saveCart(@RequestBody CartRequestDto cartRequestDto){
        Cart cart = cartService.saveCart(cartRequestDto);
        return ResponseEntity.ok(cart);
    }
}
