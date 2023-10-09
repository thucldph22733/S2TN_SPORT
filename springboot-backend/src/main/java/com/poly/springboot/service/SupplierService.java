package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Size;
import com.poly.springboot.entity.Supplier;

import java.util.List;

public interface SupplierService {
    List<Supplier> findAll();

    List<Supplier> getPage(Integer pageNo);

    String delete(Long id);

    Supplier findById(Long id);

    Supplier save(SupplierRequestDto supplierRequestDto);

    Supplier update(SupplierRequestDto supplierRequestDto,Long id);
}
