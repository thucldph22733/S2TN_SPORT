package com.poly.springboot.repository;

import com.poly.springboot.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {

    Boolean existsByPaymentName(String paymentName);

    // Lọc những bản ghi chưa bị xóa mềm
}
