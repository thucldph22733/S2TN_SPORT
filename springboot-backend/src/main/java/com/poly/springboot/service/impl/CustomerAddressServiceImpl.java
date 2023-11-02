package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;

import com.poly.springboot.entity.Address;
import com.poly.springboot.entity.CustomerAddress;
import com.poly.springboot.mapper.AddressMapper;
import com.poly.springboot.repository.AddressRepository;
import com.poly.springboot.repository.CustomerAddressRepository;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerAddressServiceImpl implements CustomerAddressService {

    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<CustomerAddress> getCustomerAddress() {
        return  customerAddressRepository.findAll();
    }

    @Override
    public Boolean createCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto) {

        CustomerAddress customerAddress = new CustomerAddress();
        customerAddress.setCustomer(customerRepository.findById(customerAddressRequestDto.getCustomerId()).orElse(null));

        Address address = new Address();
        AddressMapper.mapToAddressRequest(address,new AddressRequestDto());
        addressRepository.save(address);
        customerAddress.setAddress(addressRepository.save(address));
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        customerAddressRepository.save(customerAddress);
        return true;
    }

    @Override
    public Boolean updateCustomerAddress(CustomerAddressRequestDto customerAddressRequestDto, Long id) {
        CustomerAddress customerAddress = customerAddressRepository.findById(id).get();
        customerAddress.setCustomer(customerRepository.findById(customerAddressRequestDto.getCustomerId()).orElse(null));
        customerAddress.setAddress(addressRepository.findById(customerAddressRequestDto.getAddressId()).orElse(null));
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        customerAddressRepository.save(customerAddress);
        return true;
    }

    @Override
    public Boolean deleteCustomerAddress(Long id) {
return true;
    }


}
