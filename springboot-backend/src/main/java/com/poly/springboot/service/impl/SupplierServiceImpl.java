package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.entity.Supplier;
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
    public List<Supplier> findAll() {
        return supplierReppsitory.findAll();
    }

    @Override
    public List<Supplier> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if (supplierReppsitory.existsById(id)){
            supplierReppsitory.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Supplier findById(Long id) {
        Optional<Supplier> result = supplierReppsitory.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Supplier save(SupplierRequestDto supplierRequestDto) {
        Supplier supplier = new Supplier();
        supplier.setSupplierDescribe(supplier.getSupplierDescribe());
        supplier.setSupplierName(supplier.getSupplierName());
        supplierReppsitory.save(supplier);
        return supplier;
    }

    @Override
    public Supplier update(SupplierRequestDto supplierRequestDto, Long id) {
        Supplier supplier = supplierReppsitory.findById(id).get();

        supplier.setSupplierDescribe(supplier.getSupplierDescribe());
        supplier.setSupplierName(supplier.getSupplierName());
        supplierReppsitory.save(supplier);
        return supplier;
    }
}
