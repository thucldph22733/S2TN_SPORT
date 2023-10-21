
package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.util.Collection;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<CustomerResponeDto> getAll() {
        return customerRepository.findAll().stream().map(
                customer -> new CustomerResponeDto(
                        customer.getId(),
                        customer.getCustomerName(),
                        customer.getAvatar(),
                        customer.getNumberPhone(),
                        customer.getEmail(),
                        customer.getGender(),
                        customer.getBirthOfDay(),
                        customer.getCustomerStatus())

        ).collect(Collectors.toList());
    }

    @Override
    public Customer add(CustomerRequestDto customerRequestDto) {
        Customer customer = new Customer();
        customer.setCustomerName(customerRequestDto.getCustomerName());
        customer.setAvatar(customerRequestDto.getAvatar());
        customer.setNumberPhone(customerRequestDto.getNumberPhone());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setGender(customerRequestDto.getGender());
        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setCustomerStatus(customerRequestDto.getCustomerStatus());
        return customerRepository.save(customer);
    }

    @Override
    public Customer update(CustomerRequestDto customerRequestDto, Long id) {
        Customer customer = customerRepository.findById(id).get();
        customer.setCustomerName(customerRequestDto.getCustomerName());
        customer.setAvatar(customerRequestDto.getAvatar());
        customer.setNumberPhone(customerRequestDto.getNumberPhone());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setGender(customerRequestDto.getGender());
        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setCustomerStatus(customerRequestDto.getCustomerStatus());
        return customerRepository.save(customer);
    }

    @Override
    public String delete(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return "Delete successful";
        } else {
            return "This id was not found" + id;
        }
    }

    @Override
    public Customer findCustomerById(Long id) {
        Optional<Customer> result = customerRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public List<CustomerResponeDto> getPagination(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        List<CustomerResponeDto> list = customerRepository.findAll(pageable)
                .stream().map(c -> new CustomerResponeDto(
                        c.getId(),
                        c.getCustomerName(),
                        c.getAvatar(),
                        c.getNumberPhone(),
                        c.getEmail(),
                        c.getGender(),
                        c.getBirthOfDay(),
                        c.getCustomerStatus()
                        )).collect(Collectors.toList());
        return list;
    }

    @Override
    public List<CustomerResponeDto> searchCustomersWithPagination(String searchQuery, Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Customer> customers = customerRepository.searchByCustomerNameOrNumberPhone(searchQuery, pageable);

        return customers.getContent().stream().map(c -> new CustomerResponeDto(
                c.getId(),
                c.getCustomerName(),
                c.getAvatar(),
                c.getNumberPhone(),
                c.getEmail(),
                c.getGender(),
                c.getBirthOfDay(),
                c.getCustomerStatus()
        )).collect(Collectors.toList());
    }

}

