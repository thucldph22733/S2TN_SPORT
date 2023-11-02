package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherRequestDto {

    private Integer categoryVoucher;

    @NotBlank(message = "Tên mã giảm giá không được để trống!")
    private String voucherName;

    private Date startDate;

    private Date endDate;

    @NotNull(message = "Đơn tối thiểu không được để trống!")
    private Integer orderMinimum;  //Đơn tối thiểu

    @NotNull(message = "Giảm tối đa không được để trống!")
    private Integer maxReduce;  //Giảm tối đa

    @NotNull(message = "Số lượng mã không được để trống!")
    private Integer quantity;

    private Integer discountRate;

    private String voucherDescribe;

    private Boolean voucherStatus;

}
