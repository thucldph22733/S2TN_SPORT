package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.service.CustomerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
@RequestMapping("/api/customers/")
@Tag(name = "Customers", description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang nhân viên )")
@Validated
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
    @GetMapping("getAll")
    public ResponseEntity<List<CustomerResponseDto>> getCustomers() {
        List<CustomerResponseDto> customerResponseDtoList = customerService.getCustomers();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerResponseDtoList);
    }
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createCustomer(@Valid @RequestBody CustomerRequestDto customerRequestDto) {
        Boolean isCreated = customerService.createCustomer(customerRequestDto);
        if (isCreated) {
            return ResponseEntity.
                    status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateCustomer(@Valid @RequestBody CustomerRequestDto customerRequestDto, @RequestParam Long id) {
        Boolean isUpdated = customerService.updateCustomer(customerRequestDto,id);
        if (isUpdated){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }

    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteCustomer(@RequestParam Long id) {
        Boolean isDeleted = customerService.deleteCustomer(id);
        if (isDeleted){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }


    @GetMapping("pagination")
    public ResponseEntity<List<CustomerResponeDto>> getPagination(@RequestParam(name = "page") Optional<Integer> pageNo) {
        List<CustomerResponeDto> list = customerService.getPagination(pageNo.orElse(null));
        return new ResponseEntity<>(list, HttpStatus.OK);
    public ResponseEntity<List<CustomerResponseDto>> getPagination(@RequestParam(name = "page") Optional<Integer> pageNo) {
        List<CustomerResponseDto> customerResponseDtoList = customerService.getPagination(pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerResponseDtoList);
    }

    @GetMapping("findByPhoneNumber")
    public ResponseEntity<Customer> findCustomerById(@RequestParam String phoneNumber) {
        Customer customer = customerService.findCustomerByPhoneNumber(phoneNumber);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customer);
    }

    @GetMapping("search")
    public ResponseEntity<List<CustomerResponseDto>> searchCustomer(
            @RequestParam(name = "page") Optional<Integer> pageNo ,
            @RequestParam String keyword) {
        List<CustomerResponseDto> customerResponseDtoList = customerService.searchCustomer(keyword,pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerResponseDtoList);
    }


}
