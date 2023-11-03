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

    public static String uploadDirectory = "F:/Java/S2TN_SPORT/react-admin-frontend/src/assets/images/";


    @GetMapping("customers")
    public ResponseEntity<?> getAllCustomer() {
        return ResponseEntity.ok(customerService.getCustomers());
    }

    @PostMapping("create-customer")
    public ResponseEntity<?> createCustomer(
            @RequestParam("customerName") String customerName,
            @RequestParam("avatar") MultipartFile avatar,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("email") String email,
            @RequestParam("gender") Boolean gender,
            @RequestParam("birthOfDay") Date birthOfDay,
            @RequestParam("password") String password,
            @RequestParam("status") Integer status

    ) throws IOException, SQLException {
        CustomerRequestDto customerRequestDto = new CustomerRequestDto();
        customerRequestDto.setCustomerName(customerName);
        customerRequestDto.setAvatar(String.valueOf(avatar));
        customerRequestDto.setPhoneNumber(phoneNumber);
        customerRequestDto.setEmail(email);
        customerRequestDto.setGender(gender);
        customerRequestDto.setBirthOfDay(birthOfDay);
        customerRequestDto.setPassword(password);
        customerRequestDto.setStatus(status);
        return ResponseEntity.ok(customerService.add(customerRequestDto, avatar));
    }

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
    public ResponseEntity<ResponseDto> updateCustomer(
            @Valid
            @RequestParam Long id,
            @RequestParam("customerName") String customerName,
            @RequestParam("avatar") MultipartFile avatar,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("email") String email,
            @RequestParam("gender") Boolean gender,
            @RequestParam("birthOfDay") Date birthOfDay,
            @RequestParam("password") String password,
            @RequestParam("status") Integer status
          ) throws IOException {
        CustomerRequestDto customerRequestDto = new CustomerRequestDto();
        customerRequestDto.setCustomerName(customerName);
        customerRequestDto.setAvatar(String.valueOf(avatar));
        customerRequestDto.setPhoneNumber(phoneNumber);
        customerRequestDto.setEmail(email);
        customerRequestDto.setGender(gender);
        customerRequestDto.setBirthOfDay(birthOfDay);
        customerRequestDto.setPassword(password);
        customerRequestDto.setStatus(status);
        if (avatar != null) {
            // Nếu có tệp ảnh mới, lưu nó vào thư mục và cập nhật đường dẫn ảnh đại diện trong cơ sở dữ liệu
            String newAvatarPath = saveAvatar(avatar);

            customerRequestDto.setAvatar(newAvatarPath);
        }

        Boolean isUpdated = customerService.updateCustomer(customerRequestDto, id);
        if (isUpdated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }


    private String saveAvatar(MultipartFile avatar) throws IOException {
        String fileName = avatar.getOriginalFilename();
        String filePath = uploadDirectory + fileName;
        avatar.transferTo(new File(filePath));
        return fileName;
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

    @GetMapping("getAll/{id}")
    public ResponseEntity<CustomerResponseDto> getCustomerById(@PathVariable Long id) {
        CustomerResponseDto customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }



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

    @PutMapping("toggle-status/{id}")
    public ResponseEntity<ResponseDto> toggleCustomerStatus(@PathVariable Long id) {
        Boolean isToggled = customerService.toggleCustomerStatus(id);
        if (isToggled) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

}
