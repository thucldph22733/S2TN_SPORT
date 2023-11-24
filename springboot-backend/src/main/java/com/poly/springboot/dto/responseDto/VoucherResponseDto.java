package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponseDto {

    private Long id;

    private Integer categoryVoucher;

    private String voucherName;

    private Date startDate;

    private Date endDate;

    private Integer orderMinimum;

    private Integer maxReduce;

    private Integer quantity;

    private Integer discountRate;

    private String voucherDescribe;

    private Boolean deleted;

}
