package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
//import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;

import java.util.List;

public interface CustomerService {

    List<CustomerResponeDto> getAll();

    Customer add(CustomerRequestDto customerRequestDto);

    Customer update(CustomerRequestDto customerRequestDto, Long id);

    String delete(Long id);

    Customer findCustomerById(Long id);

    List<CustomerResponeDto> getPagination(Integer pageNo);

    List<CustomerResponeDto> searchCustomersWithPagination(String searchQuery, Integer pageNo, Integer pageSize);


}
