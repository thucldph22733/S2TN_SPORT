package com.poly.springboot.repository;


import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher,Long> {

    Page<Voucher> findByVoucherCodeContaining(String code, Pageable pageable);
    Page<Voucher> findByVoucherNameContaining(String name, Pageable pageable);
    Page<Voucher> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Voucher> findByVoucherCodeContainingAndVoucherNameContainingAndDeletedIn(String code,String name, List<Boolean> status, Pageable pageable);

    List<Voucher> findByDeletedTrue();
}
