package com.poly.springboot.repository;

import com.poly.springboot.entity.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress,Long> {

    @Query("SELECT cd FROM CustomerAddress cd WHERE cd.customer.id = :id")
    List<CustomerAddress> getCustomerAddressByCustomerId(@Param("id") Long id);
}
