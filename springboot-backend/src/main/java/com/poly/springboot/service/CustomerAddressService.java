package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.entity.CustomerAddress;

import java.util.List;

public interface CustomerAddressService {

    List<CustomerAddress> getCustomerAddress();

    Boolean createCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto);

    Boolean updateCustomerAddress(CustomerAddressRequestDto CustomerAddressRequestDto, Long id);

    Boolean deleteCustomerAddress(Long id);

}
