package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.CategoryVoucher;
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
    private CategoryVoucher categoryVoucher;
    private String voucherName;
    private Date startDate;
    private Date endDate;
    private Integer quantity;
    private Integer reductionLevel;
    private Integer discountRate;
    private String voucherDescribe;
    private Boolean voucherStatus;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
