package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import com.poly.springboot.entity.Customer;

public class CustomerMapper {

    public static Customer mapToCustomerRequest(Customer customer, CustomerRequestDto customerRequestDto) {

        customer.setCustomerName(customerRequestDto.getCustomerName());
        customer.setAvatar(customerRequestDto.getAvatar());
        customer.setPhoneNumber(customerRequestDto.getPhoneNumber());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setGender(customerRequestDto.getGender());
        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setDeleted(customerRequestDto.getStatus());
        return customer;
    }

    public static CustomerResponseDto mapToCustomerResponse(Customer customer, CustomerResponseDto customerResponseDto) {

        customerResponseDto.setId(customer.getId());
        customerResponseDto.setCustomerName(customer.getCustomerName());
        customerResponseDto.setAvatar(customer.getAvatar());
        customerResponseDto.setPhoneNumber(customer.getPhoneNumber());
        customerResponseDto.setEmail(customer.getEmail());
        customerResponseDto.setGender(customer.getGender());
        customerResponseDto.setBirthOfDay(customer.getBirthOfDay());
        customerResponseDto.setPassword(customer.getPassword());
        customerResponseDto.setStatus(customer.isDeleted());

        return customerResponseDto;
    }

}
