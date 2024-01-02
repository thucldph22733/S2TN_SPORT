package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/carts/")
@Tag(name = "Carts", description = "( Rest API Thêm giỏ hàng)")
@Validated
public class CartController {

    @Autowired
    private CartService cartService;
 ;

    // create cart detail rest api
    @GetMapping("getAllCartDetailByUserId")
    public ResponseEntity<List<CartDetailResponseDto>> getAllCartDetailByCartId(@RequestParam(required = false)  Long userId) {
        List<CartDetailResponseDto> cartDetailResponseDtoList = cartService.getAllCartDetailByCartId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cartDetailResponseDtoList);
    }

    @GetMapping("getCartByUserId")
    public ResponseEntity<Cart> getCartByUserId(@RequestParam(required = false)  Long userId) {
        Cart cart = cartService.findCartByUserId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cart);
    }

    // create cart detail rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> saveCartDetail(@RequestBody CartRequestDto cartRequestDto) {
        Boolean isCreated = cartService.createCart(cartRequestDto);

        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }


    // update cart detail rest api
    @PatchMapping("updateQuantity")
    public ResponseEntity<ResponseDto> updateCartDetail(@RequestParam Integer quantity, @RequestParam Long id) {
        Boolean isUpdated = cartService.updateCartDetail(quantity,id);

        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    // delete cart detail rest api
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteCartDetail(@RequestParam Long id) {

        Boolean isDeleted = cartService.deleteCartDetail(id);

        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
}
