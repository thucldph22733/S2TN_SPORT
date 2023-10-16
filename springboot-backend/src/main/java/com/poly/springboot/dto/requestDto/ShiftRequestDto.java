package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShiftRequestDto {

    private Long staffId;

    private Double initialAmount;

    private Double totalRevenue;

    private Double cash;

    private Double transferMoney;

    private Double totalAvailableMoney;

    private Double collectedOwner;

    private Double moneyArises;

    private String note;

}
