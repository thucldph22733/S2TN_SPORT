package com.poly.springboot.repository;


import com.poly.springboot.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDateTime;
import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher,Long> {


    @Query("SELECT v FROM Voucher v WHERE " +
            "(:keyword IS NULL OR v.voucherName LIKE %:keyword% OR v.voucherCode LIKE %:keyword% OR CAST(v.discountRate AS STRING) LIKE %:keyword%) AND " +
            "(:createdAtStart IS NULL OR v.createdAt >= :createdAtStart) AND " +
            "(:createdAtEnd IS NULL OR v.createdAt <= :createdAtEnd) AND " +
            "(:status IS NULL OR v.deleted = :status) " +
            "ORDER BY v.createdAt DESC")
    Page<Voucher> getVoucherByFilter(
            @Param("keyword") String keyword,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("status") Boolean status,
            Pageable pageable
    );

    List<Voucher> findByDeletedTrue();

    Voucher findByVoucherCode(String code);
}
