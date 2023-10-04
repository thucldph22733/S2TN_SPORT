package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.responseDto.AddressResponeDto;
import com.poly.springboot.entity.Address;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AddressService {
    List<AddressResponeDto> getAll();

    Address add(AddressRequestDto addressRequestDto);

    Address update(AddressRequestDto addressRequestDto, Long id);

    String delete(Long id);

    Address findAddressById(Long id);
}
