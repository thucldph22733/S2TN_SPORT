package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailFilterRequestDto {
    private Long colorId;
    private Long sizeId;
    private Long materialId;
    private Long brandId;
    private Double priceMin;
    private Double priceMax;
    private Long categoryId;
    private String keyword;
    private Integer pageNo;
    private Integer pageSize;
}
