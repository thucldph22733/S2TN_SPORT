package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
import com.poly.springboot.dto.responseDto.CustomerAddressResponeDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.entity.CustomerAddress;
import com.poly.springboot.repository.CustomerAddressRepository;
import com.poly.springboot.service.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerAddressServiceImpl implements CustomerAddressService {

    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    @Override
    public List<CustomerAddressResponeDto> getAll() {
        return customerAddressRepository.findAll().stream().map(
                ca -> new CustomerAddressResponeDto(ca.getId(), ca.getCustomer(), ca.getAddress(), ca.getIsDefault())
        ).collect(Collectors.toList());
    }

    @Override
    public CustomerAddress add(CustomerAddressRequestDto customerAddressRequestDto) {
        CustomerAddress customerAddress = new CustomerAddress();
        customerAddress.setCustomer(customerAddressRequestDto.getCustomer());
        customerAddress.setAddress(customerAddressRequestDto.getAddress());
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        return customerAddressRepository.save(customerAddress);
    }

    @Override
    public CustomerAddress update(CustomerAddressRequestDto customerAddressRequestDto, Long id) {
        CustomerAddress customerAddress = customerAddressRepository.findById(id).get();
        customerAddress.setCustomer(customerAddressRequestDto.getCustomer());
        customerAddress.setAddress(customerAddressRequestDto.getAddress());
        customerAddress.setIsDefault(customerAddressRequestDto.getIsDefault());
        return customerAddressRepository.save(customerAddress);
    }

    @Override
    public String delete(Long id) {
        if (customerAddressRepository.existsById(id)) {
            customerAddressRepository.deleteById(id);
            return "Delete successful";
        }else {
            return "This id was not found" + id;
        }
    }

    @Override
    public CustomerAddress findCustomerAddressById(Long id) {
        Optional<CustomerAddress> result = customerAddressRepository.findById(id);
        return result.isPresent() ? result.get() :null;
    }
}
