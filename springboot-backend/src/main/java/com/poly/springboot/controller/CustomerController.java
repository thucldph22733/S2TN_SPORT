package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("customers")
    public ResponseEntity<?>getAllCustomer(){
        return ResponseEntity.ok(customerService.getAll());
    }

    @PostMapping("create-customer")
    public ResponseEntity<?>createCustomer(@RequestBody CustomerRequestDto customerRequestDto){
        return ResponseEntity.ok(customerService.add(customerRequestDto));
    }

    @PutMapping("update-customer/{id}")
    public ResponseEntity<Customer>updateCustomer(@RequestBody CustomerRequestDto customerRequestDto,@PathVariable Long id){
        return ResponseEntity.ok(customerService.update(customerRequestDto,id));
    }

    @DeleteMapping("delete-customer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        String message = customerService.delete(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("customer/{id}")
    public ResponseEntity<Customer> findById(@PathVariable Long id) {
        Customer customer = customerService.findCustomerById(id);
        return ResponseEntity.ok(customer);
    }
}
