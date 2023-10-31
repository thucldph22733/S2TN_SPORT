package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.AddressMapper;
import com.poly.springboot.repository.AddressRepository;
import com.poly.springboot.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> getAddress() {
        return addressRepository.findAll();
    }

    @Override
    public Boolean createAddress(AddressRequestDto addressRequestDto) {

        Address address =  new Address();

        AddressMapper.mapToAddressRequest(address,addressRequestDto);

        addressRepository.save(address);
        return true;
    }

    @Override
    public Boolean updateAddress(AddressRequestDto addressRequestDto, Long id) {
       Address address = addressRepository.findById(id)
               .orElseThrow(()-> new ResourceNotFoundException("Địa chỉ",String.valueOf(id)));

        AddressMapper.mapToAddressRequest(address,addressRequestDto);

        addressRepository.save(address);
        return true;
    }

}
