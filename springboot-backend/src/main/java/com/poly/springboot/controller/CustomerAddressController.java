//package com.poly.springboot.controller;
//
//import com.poly.springboot.constants.NotificationConstants;
//import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
//import com.poly.springboot.dto.responseDto.CustomerAddressResponseDto;
//import com.poly.springboot.dto.responseDto.ResponseDto;
//import com.poly.springboot.entity.Color;
//import com.poly.springboot.entity.CustomerAddress;
//import com.poly.springboot.service.CustomerAddressService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/customerAddress/")
//@Tag(name = "CustomerAddress",description = "( Rest API Hiển thị, thêm, sửa, xóa địa chỉ giao hàng của khách hàng )")
//public class CustomerAddressController {
//
//    @Autowired
//    private CustomerAddressService customerAddressService;
//
//    @GetMapping("getAll")
//    public ResponseEntity<List<CustomerAddressResponseDto>> getCustomerAddress(){
//        List<CustomerAddressResponseDto> customerAddressList = customerAddressService.getCustomerAddress();
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(customerAddressList);
//    }
//
//    @GetMapping("getCustomerAddressByCustomerId")
//    public ResponseEntity<List<CustomerAddressResponseDto>> getCustomerAddressByCustomerId(@RequestParam Long id){
//        List<CustomerAddressResponseDto> customerAddressList = customerAddressService.getCustomerAddressByCustomerId(id);
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(customerAddressList);
//    }
//    @PostMapping("create")
//    public ResponseEntity<ResponseDto>createCustomerAddress(@Valid @RequestBody CustomerAddressRequestDto customerAddressRequestDto){
//        Boolean isCreated = customerAddressService.createCustomerAddress(customerAddressRequestDto);
//        if (isCreated) {
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }
//
//    @PutMapping("update")
//    public ResponseEntity<ResponseDto>updateCustomerAddress(@Valid @RequestBody CustomerAddressRequestDto customerAddressRequestDto, @RequestParam Long id){
//        Boolean isUpdated = customerAddressService.updateCustomerAddress(customerAddressRequestDto, id);
//        if (isUpdated) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }    }
//
//    @DeleteMapping("delete")
//    public ResponseEntity<ResponseDto> deleteCustomerAddress(@RequestParam Long id) {
//        Boolean isDeleted = customerAddressService.deleteCustomerAddress(id);
//        if (isDeleted) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }
//
//
//
//}
