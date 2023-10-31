package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Supplier;

public class SupplierMapper {

    public static Supplier mapToSupplierRequest(Supplier supplier, SupplierRequestDto supplierRequestDto){

        supplier.setSupplierName(supplierRequestDto.getSupplierName());
        supplier.setEmail(supplierRequestDto.getEmail());
        supplier.setAddress(supplierRequestDto.getAddress());
        supplier.setPhoneNumber(supplierRequestDto.getPhoneNumber());
        supplier.setSupplierDescribe(supplierRequestDto.getSupplierDescribe());

        return supplier;
    }
}
