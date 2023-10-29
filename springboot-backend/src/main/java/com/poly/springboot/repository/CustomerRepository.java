package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CustomerResponeDto;
import com.poly.springboot.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    @Query("SELECT c FROM Customer c WHERE c.customerName LIKE %:searchQuery%")
    List<Customer> searchByFullName(@Param("searchQuery") String searchQuery);

    @Query("SELECT c FROM Customer c WHERE c.customerName LIKE %:searchQuery%")
    List<Customer> searchByFirstName(@Param("searchQuery") String searchQuery);

    @Query("SELECT c FROM Customer c WHERE c.customerName LIKE %:searchQuery%")
    List<Customer> searchByLastName(@Param("searchQuery") String searchQuery);

    @Query("SELECT c FROM Customer c WHERE c.numberPhone LIKE %:searchQuery%")
    List<Customer> searchByPhoneNumber(@Param("searchQuery") String searchQuery);
}
