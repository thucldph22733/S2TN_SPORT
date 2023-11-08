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
@Tag(name = "Address", description = "( Rest API Hiển thị địa chỉ )")
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

}
