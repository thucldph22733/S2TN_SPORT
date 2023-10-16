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

    @GetMapping("customerAddress")
    public ResponseEntity<?> getAllCustomerAddress(){
        return ResponseEntity.ok(customerAddressService.getAll());
    }

    @PostMapping("create-customerAddress")
    public ResponseEntity<?>createCustomerAddress(@RequestBody CustomerAddressRequestDto customerAddressRequestDto){
        return ResponseEntity.ok(customerAddressService.add(customerAddressRequestDto));
    }

    @PutMapping("update-customerAddress/{id}")
    public ResponseEntity<CustomerAddress>updateCustomerAddress(@RequestBody CustomerAddressRequestDto customerAddressRequestDto, @PathVariable Long id){
        return ResponseEntity.ok(customerAddressService.update(customerAddressRequestDto,id));
    }

    @DeleteMapping("delete-customerAddress/{id}")
    public ResponseEntity<String> deleteCustomerAddress(@PathVariable Long id) {
        String message = customerAddressService.delete(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("customerAddress/{id}")
    public ResponseEntity<CustomerAddress> findById(@PathVariable Long id) {
        CustomerAddress customerAddress = customerAddressService.findCustomerById(id);
        return ResponseEntity.ok(customerAddress);
    }

}
