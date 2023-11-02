package com.poly.springboot.repository;

import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher,Long> {

    @Query("SELECT v FROM Voucher v WHERE v.voucherName LIKE %:keyword%")
    List<Voucher> searchVoucher(@Param("keyword") String keyword, Pageable pageable);
}
