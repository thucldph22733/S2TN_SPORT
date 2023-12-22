package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.service.CartDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/cartDetails/")
@Tag(name = "CartDetails", description = "( Rest API Hiển thị, thêm, sửa, xóa giỏ hàng chi tiết )")
public class CartDetailController {

    @Autowired
    private CartDetailService cartDetailService;

    //get all cart detail rest api
    @GetMapping("getAllCartDetailByCartId")
    public ResponseEntity<List<CartDetailResponseDto>> getAllCartDetailByCartId(@RequestParam(required = false) Long cartId) {
        List<CartDetailResponseDto> cartDetailResponseDtoList = cartDetailService.getAllCartDetailByCartId(cartId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cartDetailResponseDtoList);
    }

    // create cart detail rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> saveCartDetail(@RequestBody CartDetailRequestDto cartDetailRequestDto) {
        Boolean isCreated = cartDetailService.createCartDetail(cartDetailRequestDto);

        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    // update cart detail rest api
    @PatchMapping("update")
    public ResponseEntity<ResponseDto> updateCartDetail(@RequestBody CartDetailRequestDto cartDetailRequestDto, @RequestParam Long id) {
        Boolean isUpdated = cartDetailService.updateCartDetail(cartDetailRequestDto,id);

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

        Boolean isDeleted = cartDetailService.deleteCartDetail(id);

        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

}

