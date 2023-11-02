package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/image";

    @GetMapping("customers")
    public ResponseEntity<?> getAllCustomer() {
        return ResponseEntity.ok(customerService.getAll());
    }

    @PostMapping("create-customer")
    public ResponseEntity<?> createCustomer(
            @RequestParam("customerName") String customerName,
            @RequestParam("avatar") MultipartFile avatar,
            @RequestParam("numberPhone") String numberPhone,
            @RequestParam("email") String email,
            @RequestParam("gender") Boolean gender,
            @RequestParam("birthOfDay") Date birthOfDay,
            @RequestParam("password") String password
//            @RequestParam("customerStatus") Integer customerStatus

    ) throws IOException, SQLException {
        CustomerRequestDto customerRequestDto = new CustomerRequestDto();
        customerRequestDto.setCustomerName(customerName);
        customerRequestDto.setAvatar(String.valueOf(avatar));
        customerRequestDto.setNumberPhone(numberPhone);
        customerRequestDto.setEmail(email);
        customerRequestDto.setGender(gender);
        customerRequestDto.setBirthOfDay(birthOfDay);
        customerRequestDto.setPassword(password);
        customerRequestDto.setCustomerStatus(1);
        return ResponseEntity.ok(customerService.add(customerRequestDto, avatar));
    }

    @PutMapping("update-customer/{id}")
    public ResponseEntity<Customer> updateCustomer(@RequestBody CustomerRequestDto customerRequestDto, @PathVariable Long id) {
        return ResponseEntity.ok(customerService.update(customerRequestDto, id));
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

    @GetMapping("pagination")
    public ResponseEntity<List<CustomerResponeDto>> getPagination(@RequestParam(name = "page") Optional<Integer> pageNo) {
        List<CustomerResponeDto> list = customerService.getPagination(pageNo.orElse(null));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<Page<CustomerResponeDto>> searchCustomers(
            @RequestParam(name = "query") String query,
            Pageable pageable
    ) {
        Page<CustomerResponeDto> searchResults = customerService.searchByCustomerNameOrNumberPhone(query, pageable);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }


}
