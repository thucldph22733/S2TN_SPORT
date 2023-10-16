package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.responseDto.AddressResponseDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.repository.AddressRepository;
import com.poly.springboot.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<AddressResponseDto> getAll() {
        return addressRepository.findAll().stream().map(
        address -> new AddressResponseDto(
                address.getId(),
                address.getRecipientName(),
                address.getPhoneNumber(),
                address.getAddressDetail(),
                address.getCity(),
                address.getRegion(),
                address.getCountry())
        ).collect(Collectors.toList());
    }

    @Override
    public Address add(AddressRequestDto addressRequestDto) {
        Address address =  new Address();

        address.setRecipientName(addressRequestDto.getRecipientName());
        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
        address.setAddressDetail(addressRequestDto.getAddressDetail());
        address.setCity(addressRequestDto.getCity());
        address.setRegion(addressRequestDto.getRegion());
        address.setCountry(addressRequestDto.getCountry());

        return addressRepository.save(address);
    }

    @Override
    public Address update(AddressRequestDto addressRequestDto, Long id) {
       Address address = addressRepository.findById(id).get();

        address.setRecipientName(addressRequestDto.getRecipientName());
        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
        address.setAddressDetail(addressRequestDto.getAddressDetail());
        address.setCity(addressRequestDto.getCity());
        address.setRegion(addressRequestDto.getRegion());
        address.setCountry(addressRequestDto.getCountry());

        return addressRepository.save(address);
    }

    @Override
    public String delete(Long id) {
      if (addressRepository.existsById(id)){
          addressRepository.deleteById(id);
          return "Delete successful";
      }else{
          return "This id was not found" + id;
      }
    }

    @Override
    public Address findAddressById(Long id) {
        Optional<Address> result = addressRepository.findById(id);
        return result.isPresent() ? result.get() :null;
    }

}
