package com.poly.springboot.repository;

import com.poly.springboot.entity.Staff;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    @Query("SELECT s FROM Staff s WHERE s.staffName LIKE %:keyword% OR s.phoneNumber LIKE %:keyword% OR s.email LIKE %:keyword% ")
    List<Staff> searchStaff(@Param("keyword") String keyword, Pageable pageable);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);
}
