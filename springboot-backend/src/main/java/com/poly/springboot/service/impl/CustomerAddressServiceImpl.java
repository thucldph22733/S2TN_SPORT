package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;

import com.poly.springboot.dto.responseDto.CustomerAddressResponseDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.entity.CustomerAddress;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.AddressMapper;
import com.poly.springboot.repository.AddressRepository;
import com.poly.springboot.repository.CustomerAddressRepository;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerAddressServiceImpl implements CustomerAddressService {

    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<CustomerAddressResponseDto> getCustomerAddress() {
        List<CustomerAddressResponseDto> customerAddressResponseDtoList =customerAddressRepository.findAll()
                .stream().map(customerAddress -> AddressMapper.mapToAddressResponse(customerAddress,new CustomerAddressResponseDto())
                ).collect(Collectors.toList());

        return customerAddressResponseDtoList;
    }

    @Override
    public Boolean createCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto) {

        CustomerAddress customerAddress = new CustomerAddress();
        customerAddress.setCustomer(customerRepository.findById(customerAddressRequestDto.getCustomerId()).orElse(null));

        Address address = new Address();

        AddressMapper.mapToAddressRequest(address,customerAddressRequestDto);

        Address addressId = addressRepository.save(address);
        customerAddress.setAddress(addressId);
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        customerAddressRepository.save(customerAddress);
        return true;
    }

    @Override
    public Boolean updateCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto, Long id) {
        CustomerAddress customerAddress = customerAddressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("địa chỉ khách hàng", String.valueOf(id)));


        Address address = AddressMapper.mapToAddressRequest(new Address(),customerAddressRequestDto);

        Address addressId = addressRepository.save(address);
        customerAddress.setAddress(addressId);
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        customerAddressRepository.save(customerAddress);
        return true;
    }

    @Override
    public Boolean deleteCustomerAddress(Long id) {

        CustomerAddress customerAddress = customerAddressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("địa chỉ khách hàng", String.valueOf(id)));

        customerAddressRepository.deleteById(customerAddress.getId());
        addressRepository.deleteById(customerAddress.getAddress().getId());
        return true;
    }

    @Override
    public List<CustomerAddressResponseDto> getCustomerAddressByCustomerId(Long id) {
        List<CustomerAddressResponseDto> customerAddressResponseDtoList =customerAddressRepository.getCustomerAddressByCustomerId(id)
                .stream().map(customerAddress -> AddressMapper.mapToAddressResponse(customerAddress,new CustomerAddressResponseDto())
                ).collect(Collectors.toList());

        return customerAddressResponseDtoList;
    }


}
