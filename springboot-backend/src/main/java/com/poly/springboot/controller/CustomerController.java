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
@Tag(name = "Customers",description = "( Rest API Hiển thị, thêm, sửa, phân trang, tìm kiếm, lọc hóa đơn )")
@Validated
public class CustomerController {
    @Autowired
    private CustomerService customerService;


    @PostMapping("create-customer")
    public ResponseEntity<?> createCustomer(
            @RequestParam("customerName") String customerName,
            @RequestParam("avatar") MultipartFile avatar,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("email") String email,
            @RequestParam("gender") Boolean gender,
            @RequestParam("birthOfDay") Date birthOfDay,
            @RequestParam("password") String password,
            @RequestParam("status") Integer status,
            @RequestParam("avatarUrl") String avatarUrl // Thêm tham số này để nhận URL tải xuống
    ) throws Exception {
        CustomerRequestDto customerRequestDto = new CustomerRequestDto();
        customerRequestDto.setCustomerName(customerName);
        customerRequestDto.setPhoneNumber(phoneNumber);
        customerRequestDto.setEmail(email);
        customerRequestDto.setGender(gender);
        customerRequestDto.setBirthOfDay(birthOfDay);
        customerRequestDto.setPassword(password);
        customerRequestDto.setStatus(status);
        customerRequestDto.setAvatar(avatar);

        Customer customer = customerService.add(customerRequestDto, avatarUrl);

        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong quá trình tạo khách hàng.");
        }
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
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
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
    )  {
        CustomerRequestDto customerRequestDto = new CustomerRequestDto();
        customerRequestDto.setCustomerName(customerName);
        customerRequestDto.setAvatar(avatar);
        customerRequestDto.setPhoneNumber(phoneNumber);
        customerRequestDto.setEmail(email);
        customerRequestDto.setGender(gender);
        customerRequestDto.setBirthOfDay(birthOfDay);
        customerRequestDto.setPassword(password);
        customerRequestDto.setStatus(status);

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


    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteCustomer(@RequestParam Long id) {
        Boolean isDeleted = customerService.deleteCustomer(id);
        if (isDeleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @GetMapping("getCustomerById")
    public ResponseEntity<Customer> getCustomerById(@RequestParam Long id) {
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customer);
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
            @RequestParam(name = "page") Optional<Integer> pageNo,
            @RequestParam String keyword) {
        List<CustomerResponseDto> customerResponseDtoList = customerService.searchCustomer(keyword, pageNo.orElse(0));
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

//    @PostMapping("upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("avatar") MultipartFile file) {
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body("Vui lòng chọn một tệp để tải lên.");
//        }
//
//        try {
//            String fileName = file.getOriginalFilename();
//            String filePath = uploadDirectory + fileName;
//            File dest = new File(filePath);
//            file.transferTo(dest);
//            return ResponseEntity.ok("Tệp " + fileName + " đã được tải lên thành công.");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Lỗi trong quá trình tải lên tệp.");
//        }
//    }

}
