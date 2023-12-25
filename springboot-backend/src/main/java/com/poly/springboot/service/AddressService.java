package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AddressService {
     List<Address> getAddressesByUserId(Long userId);

     Boolean createAddress(AddressRequestDto addressRequestDto);

     Boolean updateAddress(Long id,AddressRequestDto addressRequestDto);

     Boolean deleteAddress(Long id);

     Address findAddressesByUserIdAnDeletedTrue(Long userId);
}
