package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherRequestDto {

    private Long categoryVoucherId;

    private String voucherName;

    private Date startDate;

    private Date endDate;

    private Integer quantity;

    private Integer reductionLevel;

    private Integer discountRate;

    private String voucherDescribe;

    private Boolean voucherStatus;

}
