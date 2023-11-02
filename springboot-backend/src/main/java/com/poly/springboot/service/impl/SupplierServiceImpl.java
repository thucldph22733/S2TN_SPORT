package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.entity.Supplier;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.SupplierMapper;
import com.poly.springboot.repository.SupplierReppsitory;
import com.poly.springboot.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierReppsitory supplierReppsitory;

    @Override
    public List<Supplier> getSuppliers() {
        return supplierReppsitory.findAll();
    }

    @Override
    public Boolean deleteSupplier(Long id) {

        Supplier supplier = supplierReppsitory.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("nhà cung cấp",String.valueOf(id)));

        supplierReppsitory.deleteById(supplier.getId());
        return true;
    }

    @Override
    public Boolean createSupplier(SupplierRequestDto supplierRequestDto) {
        Supplier supplier = new Supplier();

        SupplierMapper.mapToSupplierRequest(supplier,supplierRequestDto);

        supplierReppsitory.save(supplier);
        return true;
    }

    @Override
    public Boolean updateSupplier(SupplierRequestDto supplierRequestDto, Long id) {
        Supplier supplier = supplierReppsitory.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("nhà cung cấp",String.valueOf(id)));

        SupplierMapper.mapToSupplierRequest(supplier,supplierRequestDto);

        supplierReppsitory.save(supplier);
        return true;
    }
}
