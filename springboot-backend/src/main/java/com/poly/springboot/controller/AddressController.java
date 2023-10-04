package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/hien-thi")
    public ResponseEntity<?> hienThi() {
        return ResponseEntity.ok(addressService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(AddressRequestDto addressRequestDto) {
        return ResponseEntity.ok(addressService.add(addressRequestDto));
    }
    


}
