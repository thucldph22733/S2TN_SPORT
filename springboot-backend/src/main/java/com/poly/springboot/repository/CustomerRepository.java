package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    @Query("SELECT c FROM Customer c WHERE c.numberPhone LIKE %:searchQuery% OR c.customerName LIKE %:searchQuery%")
    Page<Customer> searchByCustomerNameOrNumberPhone(@Param("searchQuery") String searchQuery, Pageable pageable);
}
