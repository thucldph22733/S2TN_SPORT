package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.Staff;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShiftResponseDto {

    private Long id;

    private String staff;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Double initiaAmount;

    private Double totalRevenue;

    private Double cash;

    private Double transferMoney;

    private Double totalAvailableMoney;

    private Double moneyArises;

    private String note;
}
