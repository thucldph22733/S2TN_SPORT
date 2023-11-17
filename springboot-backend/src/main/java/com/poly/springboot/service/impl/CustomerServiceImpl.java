
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public static String uploadDirectory = "F:/Java/S2TN_SPORT/react-admin-frontend/src/assets/images/";


    @Override
    public List<CustomerResponseDto> getCustomers() {
        return customerRepository.findAll().stream().map(
                customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto())
        ).collect(Collectors.toList());
    }

    @Override
    public CustomerResponseDto getCustomerById(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            CustomerResponseDto responseDto = CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto());
            return responseDto;
        } else {
            throw new ResourceNotFoundException("Không tìm thấy id khách hàng này!");
        }
    }


    @Override
    public Customer add(CustomerRequestDto customerRequestDto, MultipartFile multipartFile) throws IOException, SQLException {
        String fileName = multipartFile.getOriginalFilename();
        String filePath = uploadDirectory + fileName;
        Customer customer = new Customer();
        customer.setAvatar(fileName); // Lưu tên tệp ảnh, không phải đường dẫn tuyệt đối
        customer.setCustomerName(customerRequestDto.getCustomerName());
        customer.setPhoneNumber(customerRequestDto.getPhoneNumber());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setGender(customerRequestDto.getGender());
        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setDeleted(customerRequestDto.getStatus());
        customerRepository.save(customer);
        multipartFile.transferTo(new File(filePath));
        return customer;
    }


    //    @Override
//    public Customer update(CustomerRequestDto customerRequestDto, Long id) {
//        Optional<Customer> optionalCustomer = customerRepository.findById(id);
//        Customer customer = optionalCustomer.get();
//        customer.setAvatar(customerRequestDto.getAvatar());
//        customer.setCustomerName(customerRequestDto.getCustomerName());
//        customer.setPhoneNumber(customerRequestDto.getPhoneNumber());
//        customer.setEmail(customerRequestDto.getEmail());
//        customer.setGender(customerRequestDto.getGender());
//        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
//        customer.setPassword(customerRequestDto.getPassword());
//        customer.setStatus(customerRequestDto.getStatus());
//        return customerRepository.save(customer);
//
//    }
    public Boolean createCustomer(CustomerRequestDto customerRequestDto) {

        Customer customer = new Customer();

        CustomerMapper.mapToCustomerRequest(customer, customerRequestDto);

        Optional<Customer> result = customerRepository.findCustomerByPhoneNumber(customerRequestDto.getPhoneNumber());
        if (result.isPresent()) {
            throw new AlreadyExistsException("Số điện thoại này đã tồn tại!");
        }
        Boolean isEmail = customerRepository.existsByEmail(customerRequestDto.getEmail());
        if (isEmail) {
            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại!");
        }

        customerRepository.save(customer);
        return true;
    }

    @Override
    public Boolean updateCustomer(CustomerRequestDto customerRequestDto, Long id) {
        Customer customer = customerRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id khách hàng này!"));

        CustomerMapper.mapToCustomerRequest(customer, customerRequestDto);

        customerRepository.save(customer);
        return true;
    }

    public Boolean deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id khách hàng này!"));

        customer.setDeleted(!customer.isDeleted());

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
                orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy số điện thoại khách hàng bộ này!"));
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

    @Override
    public Boolean toggleCustomerStatus(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id khách hàng bộ này!"));

        // Kiểm tra và chuyển đổi trạng thái
        customer.setDeleted(!customer.isDeleted());

        customerRepository.save(customer);

        return true;
    }


}

