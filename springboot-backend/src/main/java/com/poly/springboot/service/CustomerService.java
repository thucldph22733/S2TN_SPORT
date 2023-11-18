package com.poly.springboot.service;

import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface CustomerService {

    List<CustomerResponseDto> getCustomers();
    CustomerResponseDto getCustomerById(Long id);

    Customer add(CustomerRequestDto customerRequestDto, MultipartFile multipartFiles) throws IOException, SQLException;

    Boolean createCustomer(CustomerRequestDto customerRequestDto);

    Boolean updateCustomer(CustomerRequestDto customerRequestDto, Long id);

    Boolean deleteCustomer(Long id);

    List<CustomerResponseDto> getPagination(Integer pageNo);

    Customer findCustomerByPhoneNumber(String phoneNumber);


    List<CustomerResponseDto> searchCustomer(String keyword,Integer pageNo);

    Boolean toggleCustomerStatus(Long id);


}
