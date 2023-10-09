package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.entity.CustomerAddress;
import com.poly.springboot.service.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CustomerAddressController {

    @Autowired
    private CustomerAddressService customerAddressService;

    @GetMapping("customer-address")
    public ResponseEntity<?> hienThi() {
        return ResponseEntity.ok(customerAddressService.getAll());
    }

    @PostMapping("create-customer-address")
    public ResponseEntity<?> add(CustomerAddressRequestDto customerAddressRequestDto) {
        return ResponseEntity.ok(customerAddressService.add(customerAddressRequestDto));
    }

    @PutMapping("update-customer-address/{id}")
    public ResponseEntity<?> update(CustomerAddressRequestDto customerAddressRequestDto, @PathVariable Long id){
        CustomerAddress customerAddress = customerAddressService.update(customerAddressRequestDto,id);
        return ResponseEntity.ok(customerAddress);
    }

    @DeleteMapping("delete-customer-address")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String message = customerAddressService.delete(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("customer-address/{id}")
    public ResponseEntity<CustomerAddress> getCustomerAddress(@PathVariable Long id){
        CustomerAddress customerAddress = customerAddressService.findCustomerAddressById(id);
        return ResponseEntity.ok(customerAddress);
    }


}
