package com.poly.springboot.repository;

import com.poly.springboot.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier,Long> {

    Supplier findBySupplierName(String name);
    @Query("SELECT s FROM Supplier s WHERE s.deleted = true ORDER BY s.createdAt DESC")

    List<Supplier> findAllByDeletedTrue();
    Boolean existsBySupplierName(String SupplierName);
    Page<Supplier> findBySupplierNameContaining(String supplierName,Pageable pageable);
    Page<Supplier> findByPhoneNumberContaining(String phoneNumber,Pageable pageable);
    Page<Supplier> findByEmailContaining(String email,Pageable pageable);
    Page<Supplier> findByDeletedIn(List<Boolean> status, Pageable pageable);
    List<Supplier> findByDeletedTrue();
    @Query("SELECT s FROM Supplier s WHERE " +
            "(LOWER(s.supplierName) LIKE LOWER(CONCAT('%', :supplierName, '%')) AND " +
            "LOWER(s.email) LIKE LOWER(CONCAT('%', :phoneNumber, '%')) AND " +
            "LOWER(s.phoneNumber) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "s.deleted IN :status")
    Page<Supplier> findByKeyword(@Param("supplierName") String supplierName,@Param("phoneNumber") String phoneNumber,@Param("email") String email,@Param("status") List<Boolean> status, Pageable pageable);}
