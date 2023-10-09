package com.poly.springboot.repository;

import com.poly.springboot.entity.VoucherOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherOrderRepository extends JpaRepository<VoucherOrder, Long> {
}
