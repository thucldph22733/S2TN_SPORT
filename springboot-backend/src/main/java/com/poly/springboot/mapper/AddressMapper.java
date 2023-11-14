//package com.poly.springboot.mapper;
//
//import com.poly.springboot.dto.requestDto.AddressRequestDto;
//import com.poly.springboot.dto.requestDto.CustomerAddressRequestDto;
//import com.poly.springboot.dto.responseDto.CustomerAddressResponseDto;
//import com.poly.springboot.entity.Address;
////import com.poly.springboot.entity.CustomerAddress;
//
//public class AddressMapper {
//
//    public static Address mapToAddressRequest(Address address, CustomerAddressRequestDto addressRequestDto){
//        address.setRecipientName(addressRequestDto.getRecipientName());
//        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
//        address.setAddressDetail(addressRequestDto.getAddressDetail());
//        address.setCity(addressRequestDto.getCity());
//        address.setRegion(addressRequestDto.getRegion());
//        address.setDistrict(addressRequestDto.getDistrict());
//        return address;
//    }
//
//    public static CustomerAddressResponseDto mapToAddressResponse(CustomerAddress customerAddress, CustomerAddressResponseDto customerAddressResponseDto){
//        customerAddressResponseDto.setId(customerAddress.getId());
//        customerAddressResponseDto.setRecipientName(customerAddress.getAddress().getRecipientName());
//        customerAddressResponseDto.setPhoneNumber(customerAddress.getAddress().getPhoneNumber());
//        customerAddressResponseDto.setAddressDetail(customerAddress.getAddress().getAddressDetail());
//        customerAddressResponseDto.setCity(customerAddress.getAddress().getCity());
//        customerAddressResponseDto.setRegion(customerAddress.getAddress().getRegion());
//        customerAddressResponseDto.setDistrict(customerAddress.getAddress().getDistrict());
//        customerAddressResponseDto.setIsDefault(customerAddress.getIsDefault());
//        return customerAddressResponseDto;
//    }
//}
