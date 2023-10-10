package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("address")
    public ResponseEntity<?> getAllAddress(){
        return ResponseEntity.ok(addressService.getAll());
    }

    @PostMapping("create-address")
    public ResponseEntity<?>createAddress(AddressRequestDto addressRequestDto){
        return ResponseEntity.ok(addressService.add(addressRequestDto));
    }

    @PutMapping("update-address/{id}")
    public ResponseEntity<Address>updateAddress(AddressRequestDto addressRequestDto, @PathVariable Long id){
        return ResponseEntity.ok(addressService.update(addressRequestDto,id));
    }

    @DeleteMapping("delete-address/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long id) {
        String message = addressService.delete(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("address/{id}")
    public ResponseEntity<Address> findById(@PathVariable Long id) {
        Address address = addressService.findAddressById(id);
        return ResponseEntity.ok(address);
    }
}
