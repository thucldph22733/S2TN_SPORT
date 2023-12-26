package com.poly.springboot.controller;


import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.requestDto.BrandRequestDto;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/address/")
@Tag(name = "Address", description = "( Rest API Hiển thị địa chỉ )")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("getAddressesByUserId")
    public ResponseEntity<List<Address>> getAllAddress(@RequestParam Long userId) {
        List<Address> addressList = addressService.getAddressesByUserId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(addressList);
    }
    @GetMapping("findAddressesByUserIdAnDeletedTrue")
    public ResponseEntity<Address> findAddressesByUserIdAnDeletedTrue(@RequestParam Long userId) {
        Address address = addressService.findAddressesByUserIdAnDeletedTrue(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(address);
    }
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createAddress(@Valid @RequestBody AddressRequestDto addressRequestDto) {
        Boolean isCreated = addressService.createAddress(addressRequestDto);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateAddress(@Valid @RequestBody AddressRequestDto addressRequestDto, @RequestParam Long id) {
        Boolean isUpdated = addressService.updateAddress(id,addressRequestDto);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteAddress(@RequestParam Long id) {
        Boolean isDelete = addressService.deleteAddress(id);
        if (isDelete) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
}
