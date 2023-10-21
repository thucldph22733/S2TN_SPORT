package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CustomerRequestDto;
//import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    List<CustomerResponeDto> getAll();

    Customer add(CustomerRequestDto customerRequestDto);

    Customer update(CustomerRequestDto customerRequestDto, Long id);

    String delete(Long id);

    Customer findCustomerById(Long id);

    List<CustomerResponeDto> getPagination(Integer pageNo);

    Page<CustomerResponeDto> searchByCustomerNameOrNumberPhone(String searchQuery, Pageable pageable);


}
