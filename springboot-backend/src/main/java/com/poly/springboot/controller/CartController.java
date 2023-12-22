package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.User;
import com.poly.springboot.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/carts/")
@Tag(name = "Carts", description = "( Rest API Thêm giỏ hàng)")
@Validated
public class CartController {

    @Autowired
    private CartService cartService;

    // create cart detail rest api
    @PostMapping("create")
    public ResponseEntity<Cart> createCart(@RequestBody CartRequestDto cartRequestDto) {
        Cart cart = cartService.createCart(cartRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cart);

    }
}
