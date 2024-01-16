package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Top10SaleResponseDto {

    private String productImage;

    private String productName;

    private Long totalQuantitySold;

    private Double totalRevenue;
}
