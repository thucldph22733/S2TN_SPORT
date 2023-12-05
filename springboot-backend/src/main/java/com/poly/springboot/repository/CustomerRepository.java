package com.poly.springboot.repository;


import com.poly.springboot.entity.Customer;
import com.poly.springboot.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {


    Optional<Customer> findCustomerByPhoneNumber(String phoneNumber);

    Boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE c.phoneNumber LIKE %:keyword% OR c.customerName LIKE %:keyword%  OR c.email LIKE %:keyword% ")
    List<Customer> searchCustomer(@Param("keyword") String keyword, Pageable pageable);


 }
