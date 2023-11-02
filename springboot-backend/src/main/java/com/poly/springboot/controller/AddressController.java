package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.service.AddressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/address/")
@Tag(name = "Address", description = "( Rest API Hiển thị, thêm, sửa địa chỉ )")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("getAll")
    public ResponseEntity<List<Address>> getAllAddress() {
        List<Address> addressList = addressService.getAddress();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(addressList);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createAddress(@Valid @RequestBody AddressRequestDto addressRequestDto) {
        Boolean isCreated = addressService.createAddress(addressRequestDto);
        if (isCreated) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }

    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateAddress(@Valid @RequestBody AddressRequestDto addressRequestDto, @RequestParam Long id) {
        Boolean isCreated = addressService.createAddress(addressRequestDto);
        if (isCreated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }


}
