
package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.CustomerMapper;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<CustomerResponseDto> getCustomers() {
        return customerRepository.findAll().stream().map(
                customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto())
        ).collect(Collectors.toList());
    }

    @Override
    public Boolean createCustomer(CustomerRequestDto customerRequestDto) {

        Customer customer = new Customer();

        CustomerMapper.mapToCustomerRequest(customer, customerRequestDto);
        customer.setStatus(0);

        Optional<Customer> result = customerRepository.findCustomerByPhoneNumber(customerRequestDto.getPhoneNumber());
        if (result.isPresent()) {
            throw new AlreadyExistsException("Số điện thoại này đã được đăng ký:  " + customerRequestDto.getPhoneNumber());
        }
        Boolean isEmail = customerRepository.existsByEmail(customerRequestDto.getEmail());
        if (isEmail) {
            throw new AlreadyExistsException("Địa chỉ email này đã được đăng ký:  " + customerRequestDto.getEmail());
        }

        customerRepository.save(customer);
        return true;
    }

    @Override
    public Boolean updateCustomer(CustomerRequestDto customerRequestDto, Long id) {
        Customer customer = customerRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Khách hàng", String.valueOf(id)));

        CustomerMapper.mapToCustomerRequest(customer, customerRequestDto);

        customerRepository.save(customer);
        return true;
    }

    @Override
    public Boolean deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Khách hàng", String.valueOf(id)));
        if (customer.getStatus() == 0) {
            customer.setStatus(1);
        } else {
            customer.setStatus(0);
        }
        customerRepository.save(customer);
        return true;
    }


    @Override
    public List<CustomerResponseDto> getPagination(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        List<CustomerResponseDto> list = customerRepository.findAll(pageable)
                .stream().map(customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto())
                ).collect(Collectors.toList());
        return list;
    }

    @Override
    public Customer findCustomerByPhoneNumber(String phoneNumber) {
        Customer customer = customerRepository.findCustomerByPhoneNumber(phoneNumber).
                orElseThrow(() -> new ResourceNotFoundException("Khách hàng", phoneNumber));
        return customer;

    }

    @Override
    public List<CustomerResponseDto> searchCustomer(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        List<CustomerResponseDto> list = customerRepository.searchCustomer(keyword, pageable)
                .stream().map(customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto()
                )).collect(Collectors.toList());
        return list;
    }

}

