package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import com.poly.springboot.entity.Customer;

import java.util.List;

public interface CustomerService {

    List<CustomerResponseDto> getCustomers();

    Boolean createCustomer(CustomerRequestDto customerRequestDto);

    Boolean updateCustomer(CustomerRequestDto customerRequestDto, Long id);

    Boolean deleteCustomer(Long id);

    List<CustomerResponseDto> getPagination(Integer pageNo);

    Customer findCustomerByPhoneNumber(String phoneNumber);

    List<CustomerResponseDto> searchCustomer(String keyword,Integer pageNo);

}
