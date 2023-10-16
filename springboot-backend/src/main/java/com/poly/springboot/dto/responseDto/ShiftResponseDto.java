package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShiftResponseDto {

    private Long id;

    private String staffName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Double initialAmount;

    private Double totalRevenue;

    private Double cash;

    private Double transferMoney;

    private Double totalAvailableMoney;

    private Double moneyArises;

    private Double collectedOwner;

    private String note;
}
