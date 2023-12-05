
package com.poly.springboot.service.impl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.poly.springboot.dto.requestDto.CustomerRequestDto;
import com.poly.springboot.dto.responseDto.CustomerResponseDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.CustomerMapper;
import com.poly.springboot.repository.CustomerRepository;
import com.poly.springboot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.util.List;
import java.util.Objects;
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
    public Customer getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khách hàng", String.valueOf(id)));

        return customer;
    }


    @Override
    public Customer add(CustomerRequestDto customerRequestDto, String avatar) throws Exception {
        // Tạo đối tượng Customer và đặt các giá trị
        Customer customer = new Customer();
        customer.setAvatar(avatar); // Lưu URL tải xuống từ Firebase Storage
        customer.setCustomerName(customerRequestDto.getCustomerName());
        customer.setPhoneNumber(customerRequestDto.getPhoneNumber());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setGender(customerRequestDto.getGender());
        customer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setStatus(customerRequestDto.getStatus());

        // Lưu đối tượng Customer vào cơ sở dữ liệu
        customerRepository.save(customer);

        return customer;
    }
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
        // Tìm khách hàng theo ID
        Customer existingCustomer = customerRepository.findById(id).orElse(null);
        if (existingCustomer == null) {
            return false; // Trả về false nếu không tìm thấy khách hàng với ID
        }
        // Cập nhật thông tin khách hàng từ customerRequestDto
        existingCustomer.setCustomerName(customerRequestDto.getCustomerName());
        existingCustomer.setPhoneNumber(customerRequestDto.getPhoneNumber());
        existingCustomer.setEmail(customerRequestDto.getEmail());
        existingCustomer.setGender(customerRequestDto.getGender());
        existingCustomer.setBirthOfDay(customerRequestDto.getBirthOfDay());
        existingCustomer.setPassword(customerRequestDto.getPassword());
        existingCustomer.setStatus(customerRequestDto.getStatus());
        existingCustomer.setAvatar(String.valueOf(customerRequestDto.getAvatar()));

        // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        customerRepository.save(existingCustomer);
        return true; // Trả về true nếu cập nhật thành công
    }



    public Boolean deleteCustomer (Long id){
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
        public List<CustomerResponseDto> getPagination (Integer pageNo){
            Pageable pageable = PageRequest.of(pageNo, 10);
            List<CustomerResponseDto> list = customerRepository.findAll(pageable)
                    .stream().map(customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto())
                    ).collect(Collectors.toList());
            return list;
        }

        @Override

        public Customer findCustomerByPhoneNumber (String phoneNumber){
            Customer customer = customerRepository.findCustomerByPhoneNumber(phoneNumber).
                    orElseThrow(() -> new ResourceNotFoundException("Khách hàng", phoneNumber));
            return customer;

        }

        @Override
        public List<CustomerResponseDto> searchCustomer (String keyword, Integer pageNo){
            Pageable pageable = PageRequest.of(pageNo, 10);
            List<CustomerResponseDto> list = customerRepository.searchCustomer(keyword, pageable)
                    .stream().map(customer -> CustomerMapper.mapToCustomerResponse(customer, new CustomerResponseDto()
                    )).collect(Collectors.toList());
            return list;
        }

    @Override
    public Boolean toggleCustomerStatus(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khách hàng", String.valueOf(id)));

        // Kiểm tra và chuyển đổi trạng thái
        if (customer.getStatus() == 0) {
            customer.setStatus(1);
        } else {
            customer.setStatus(0);
        }

        customerRepository.save(customer);
        return true;
    }



}

