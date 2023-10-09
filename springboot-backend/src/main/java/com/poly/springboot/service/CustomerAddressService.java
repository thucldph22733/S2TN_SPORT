package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.dto.responseDto.CustomerAddressResponeDto;
import com.poly.springboot.entity.CustomerAddress;

import java.util.List;

public interface CustomerAddressService {
    List<CustomerAddressResponeDto> getAll();

    CustomerAddress add(CustomerAddressRequestDto customerAddressRequestDto);

    CustomerAddress update(CustomerAddressRequestDto customerAddressRequestDto, Long id);

    String delete(Long id);

    CustomerAddress findCustomerAddressById(Long id);
}
