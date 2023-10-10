package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.responseDto.AddressResponseDto;
import com.poly.springboot.entity.Address;

import java.util.List;


public interface AddressService {
    List<AddressResponseDto> getAll();

    Address add(AddressRequestDto addressRequestDto);

    Address update(AddressRequestDto addressRequestDto, Long id);

    String delete(Long id);

    Address findAddressById(Long id);
}
