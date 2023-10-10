package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.CartDetail;
import com.poly.springboot.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CartDetailController {

    @Autowired
    private CartDetailService cartDetailService;

    //get all cart detail rest api
    @GetMapping("cartDetails")
    public ResponseEntity<List<CartDetailResponseDto>> getCartDetails() {
        List<CartDetailResponseDto> cartDetailResponseDtoList = cartDetailService.getCartDetails();
        return ResponseEntity.ok(cartDetailResponseDtoList);
    }
    // create cart detail rest api
    @PostMapping("create-cartDetail")
    public ResponseEntity<CartDetail> saveCartDetail(@RequestBody CartDetailRequestDto cartDetailRequestDto){
        CartDetail cartDetail = cartDetailService.saveCartDetail(cartDetailRequestDto);
        return ResponseEntity.ok(cartDetail);
    }

    // update cart detail rest api
    @PutMapping("update-cartDetail")
    public ResponseEntity<CartDetail> updateCartDetail(@RequestBody CartDetailRequestDto cartDetailRequestDto, @PathVariable Long id){
        CartDetail cartDetail = cartDetailService.updateCartDetail(cartDetailRequestDto,id);
        return ResponseEntity.ok(cartDetail);
    }

    // delete cart detail rest api
    @DeleteMapping("delete-cartDetail")
    public ResponseEntity<String> deleteCartDetail(@PathVariable Long id){
        String message = cartDetailService.deleteCartDetail(id);
        return ResponseEntity.ok(message);
    }
}

