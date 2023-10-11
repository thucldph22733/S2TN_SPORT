package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
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
    public ResponseEntity<?> getAllCustomerAdress(){
        return ResponseEntity.ok(customerAddressService.getAll());
    }

    @PostMapping("create-customer-address")
    public ResponseEntity<?>createCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto){
        return ResponseEntity.ok(customerAddressService.add(customerAddressRequestDto));
    }

    @PutMapping("update-customer-address/{id}")
    public ResponseEntity<CustomerAddress>updateCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto, @PathVariable Long id){
        return ResponseEntity.ok(customerAddressService.update(customerAddressRequestDto,id));
    }

    @DeleteMapping("delete-customer-address/{id}")
    public ResponseEntity<String> deleteCustomerAddress(@PathVariable Long id) {
        String message = customerAddressService.delete(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("customer-address/{id}")
    public ResponseEntity<CustomerAddress> findById(@PathVariable Long id) {
        CustomerAddress customerAddress = customerAddressService.findCustomerById(id);
        return ResponseEntity.ok(customerAddress);
    }

}
