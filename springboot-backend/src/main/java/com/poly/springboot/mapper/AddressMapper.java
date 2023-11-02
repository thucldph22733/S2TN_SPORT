package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;

public class AddressMapper {

    public static Address mapToAddressRequest(Address address, AddressRequestDto addressRequestDto){
        address.setRecipientName(addressRequestDto.getRecipientName());
        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
        address.setAddressDetail(addressRequestDto.getAddressDetail());
        address.setCity(addressRequestDto.getCity());
        address.setRegion(addressRequestDto.getRegion());
        address.setDistrict(addressRequestDto.getDistrict());
        return address;
    }
}
