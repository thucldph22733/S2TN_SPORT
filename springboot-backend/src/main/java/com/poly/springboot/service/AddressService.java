package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;

import java.util.List;


public interface AddressService {
    List<Address> getAddress();

    Boolean createAddress(AddressRequestDto addressRequestDto);

    Boolean updateAddress(AddressRequestDto addressRequestDto, Long id);

}
