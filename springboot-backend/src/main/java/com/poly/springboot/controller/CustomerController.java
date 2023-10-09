package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("customers")
    public ResponseEntity<?> Customers(){
        return ResponseEntity.ok(customerService.getAll());
    }

    @PostMapping ("create-customer")
    public ResponseEntity<?> create(CustomerRequestDto customerRequestDto){
        return ResponseEntity.ok(customerService.add(customerRequestDto));
    }

    @DeleteMapping("delete-customer/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        String message = customerService.delete(id);
        return ResponseEntity.ok(message);
    }

    @PutMapping("update-customer/{id}")
    public ResponseEntity<?> update(CustomerRequestDto customerRequestDto, @PathVariable Long id){
        Customer customer = customerService.update(customerRequestDto,id);
        return ResponseEntity.ok(customer);
    }

    @GetMapping("customer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id){
        Customer customer = customerService.findAddressById(id);
        return ResponseEntity.ok(customer);
    }
}
