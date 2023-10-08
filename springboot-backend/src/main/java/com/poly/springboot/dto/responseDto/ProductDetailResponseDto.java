package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponseDto {
    private Long id;

    private String productName;

    private String colorName;

    private String materialName;

    private String sizeName;

    private Integer quantity;

    private Double price;

    private Double promotionPrice;

    private String createBy;

    private String updateBy;

}
