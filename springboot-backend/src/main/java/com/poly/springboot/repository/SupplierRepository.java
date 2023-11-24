package com.poly.springboot.repository;

import com.poly.springboot.entity.Supplier;
import com.poly.springboot.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier,Long> {

    Boolean existsBySupplierName(String SupplierName);
    Page<Supplier> findBySupplierNameContaining(String name, Pageable pageable);
    Page<Supplier> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Supplier> findBySupplierNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
}
