package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherOrderRequestDto {
    private Order order;

    private Voucher voucher;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

}
