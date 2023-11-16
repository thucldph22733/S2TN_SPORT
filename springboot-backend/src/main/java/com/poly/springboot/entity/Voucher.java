package com.poly.springboot.entity;

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
import java.sql.Date;


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

    @Column(name = "category_voucher")
    private Integer categoryVoucher;

    @Column(name = "voucher_name")
    private String voucherName;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "order_minimum")  // don hang toi thieu
    private Integer orderMinimum;

    @Column(name = "max_reduce")  // giam toi da
    private Integer maxReduce;

    @Column(name = "discount_rate")  // ty le chiet khau
    private Integer discountRate;

    @Column(name = "voucher_describe")
    private String voucherDescribe;

    @Column(name = "voucher_status")
    private Boolean status;


}
