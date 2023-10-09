package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.AddressResponeDto;
import com.poly.springboot.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
