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

    @NotNull(message = "Ngày bắt đầu không được để trống!")
    private Date startDate;

    @NotNull(message = "Ngày kết thúc không được để trống!")
    private Date endDate;

    @NotNull(message = "Đơn tối thiểu không được để trống!")
    private Integer orderMinimum;  //Đơn tối thiểu

    @NotNull(message = "Giảm tối đa không được để trống!")
    private Integer maxReduce;  //Giảm tối đa

    @NotNull(message = "Số lượng không được để trống!")
    private Integer quantity;

    @NotNull(message = "Tỉ lệ chiết khấu không được để trống!")
    private Integer discountRate;

    private String voucherDescribe;

    private Boolean status;

}
