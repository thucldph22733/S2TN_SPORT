package com.poly.springboot.dto.responseDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailInfoResponseDto {

    private String productName;

    private String productDescribe;

    private Long quantityTotal;

    private Double minPrice;

    private String categoryName;

    private String brandName;
}
