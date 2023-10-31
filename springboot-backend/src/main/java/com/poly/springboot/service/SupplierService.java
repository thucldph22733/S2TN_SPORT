package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Supplier;

import java.util.List;

public interface SupplierService {
    List<Supplier> getSuppliers();

    Boolean deleteSupplier(Long id);

    Boolean createSupplier(SupplierRequestDto supplierRequestDto);

    Boolean updateSupplier(SupplierRequestDto supplierRequestDto,Long id);
}
