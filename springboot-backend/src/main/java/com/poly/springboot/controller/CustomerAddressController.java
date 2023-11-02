package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.entity.CustomerAddress;
import com.poly.springboot.service.CustomerAddressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customerAddress/")
@Tag(name = "CustomerAddress")
public class CustomerAddressController {

    @Autowired
    private CustomerAddressService customerAddressService;

    @GetMapping("getAll")
    public ResponseEntity<?> getAllCustomerAddress(){
        return ResponseEntity.ok(customerAddressService.getCustomerAddress());
    }

    @PostMapping("create")
    public ResponseEntity<?>createCustomerAddress(@RequestBody CustomerAddressRequestDto customerAddressRequestDto){
        return ResponseEntity.ok(customerAddressService.createCustomerAddress(customerAddressRequestDto));
    }

    @PutMapping("update")
    public ResponseEntity<?>updateCustomerAddress(@RequestBody CustomerAddressRequestDto customerAddressRequestDto, @RequestParam Long id){
        return ResponseEntity.ok(customerAddressService.updateCustomerAddress(customerAddressRequestDto,id));
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteCustomerAddress(@RequestParam Long id) {
       return ResponseEntity.ok( customerAddressService.deleteCustomerAddress(id));
//        return ResponseEntity.ok(message);
    }



}
