package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.entity.Supplier;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.SupplierMapper;
import com.poly.springboot.repository.SupplierRepository;
import com.poly.springboot.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Page<Supplier> getSuppliers(String supplierName, String phoneNumber, String email,List<Boolean> status, Pageable pageable) {

        if (supplierName == null && phoneNumber == null && email == null && status == null){
            return supplierRepository.findAll(pageable);
        }else if(supplierName == null && phoneNumber == null && email == null){
            return supplierRepository.findByDeletedIn(status,pageable);
        }else if( phoneNumber == null && email == null && status == null){
            return supplierRepository.findBySupplierNameContaining(supplierName,pageable);
        }else if(email == null && status == null && supplierName == null){
            return supplierRepository.findByPhoneNumberContaining(phoneNumber,pageable);
        }else if(status == null && supplierName == null && phoneNumber == null){
            return supplierRepository.findByEmailContaining(email,pageable);
        }else {
            return supplierRepository.findByKeyword(supplierName,phoneNumber,email,status,pageable);
        }
    }

    @Override
    public List<Supplier> findByDeletedTrue() {
        return supplierRepository.findByDeletedTrue();
    }

    @Override
    public Boolean deleteSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhà cung cấp này!"));

        supplier.setDeleted(!supplier.getDeleted());

        supplierRepository.save(supplier);

        return true;
    }

    @Override
    public Boolean createSupplier(SupplierRequestDto supplierRequestDto) {
        Supplier supplier = new Supplier();

        SupplierMapper.mapToSupplierRequest(supplier,supplierRequestDto);
        if (supplierRepository.existsBySupplierName(supplierRequestDto.getSupplierName())){
            throw new AlreadyExistsException("Tên nhà cung cấp đã tồn tại!");
        }
        supplierRepository.save(supplier);
        return true;
    }

    @Override
    public Boolean updateSupplier(SupplierRequestDto supplierRequestDto, Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhà cung cấp này!"));

        SupplierMapper.mapToSupplierRequest(supplier,supplierRequestDto);

        supplierRepository.save(supplier);
        return true;
    }
}
