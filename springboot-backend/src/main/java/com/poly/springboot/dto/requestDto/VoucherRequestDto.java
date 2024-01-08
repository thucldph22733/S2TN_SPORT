package com.poly.springboot.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherRequestDto {
    @JsonIgnore
    private Long id;

    @NotBlank(message = "Mã giảm giá không được để trống!")
    private String voucherCode;

    @NotBlank(message = "Tên giảm giá không được để trống!")
    private String voucherName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @NotNull(message = "Đơn tối thiểu không được để trống!")
    private Integer orderMinimum;  //Đơn tối thiểu

    @NotNull(message = "Giảm tối đa không được để trống!")
    private Integer maxReduce;  //Giảm tối đa

    @NotNull(message = "Số lượng không được để trống!")
    private Integer quantity;

    @NotNull(message = "Tỉ lệ chiết khấu không được để trống!")
    private Integer discountRate;

    private Integer status;

    private Boolean deleted;

}
