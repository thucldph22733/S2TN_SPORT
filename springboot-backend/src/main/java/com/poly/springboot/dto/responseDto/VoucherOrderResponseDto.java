package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherOrderResponseDto {
    private Long id;

    private Order order;

    private Voucher voucher;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

}
