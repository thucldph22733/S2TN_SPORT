package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.dto.responseDto.CustomerAddressResponseDto;
import com.poly.springboot.entity.CustomerAddress;

import java.util.List;

public interface CustomerAddressService {

    List<CustomerAddressResponseDto> getAll();

    CustomerAddress add(CustomerAddressRequestDto customerAddressRequestDto);

    CustomerAddress update(CustomerAddressRequestDto CustomerAddressRequestDto, Long id);

    String delete(Long id);

    CustomerAddress findCustomerById(Long id);
}
