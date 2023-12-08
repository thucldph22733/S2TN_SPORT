package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SupplierService {
    Page<Supplier> getSuppliers(String supplierName, String phoneNumber, String email,List<Boolean> status, Pageable pageable);

    List<Supplier> findByDeletedTrue();

    Boolean deleteSupplier(Long id);

    Boolean createSupplier(SupplierRequestDto supplierRequestDto);

    Boolean updateSupplier(SupplierRequestDto supplierRequestDto,Long id);

    List<Supplier> findAllByDeletedTrue();
}
