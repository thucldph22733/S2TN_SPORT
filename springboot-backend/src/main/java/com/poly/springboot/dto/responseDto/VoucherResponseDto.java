package com.poly.springboot.dto.responseDto;

import com.poly.springboot.dto.requestDto.VoucherRequestDto;
import com.poly.springboot.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.sql.Date;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponseDto {

    private Long id;

    private String voucherCode;

    private String voucherName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer orderMinimum;

    private Integer maxReduce;

    private Integer quantity;

    private Integer discountRate;

    private String note;

    private Boolean deleted;


    public VoucherResponseDto( VoucherRequestDto requestDto) {
            BeanUtils.copyProperties(requestDto, this);
    }
    public VoucherResponseDto(Voucher voucher) {
        BeanUtils.copyProperties(voucher, this);
    }
}
