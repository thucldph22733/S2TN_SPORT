package com.poly.springboot.entity;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vouchers")
public class Voucher extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "voucher_code")
    private String voucherCode;

    @Column(name = "voucher_name")
    private String voucherName;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "order_minimum")  // don hang toi thieu
    private Integer orderMinimum;

    @Column(name = "max_reduce")  // giam toi da
    private Integer maxReduce;

    @Column(name = "discount_rate")  // ty le chiet khau
    private Integer discountRate;

    @Column(name = "note")
    private String note;

    public Voucher(VoucherRequestDto req) {
        BeanUtils.copyProperties(req, this);
    }
}
