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

    private String productAvatar;

    private String colorName;

    private String sizeName;

    private String materialName;

    private Integer quantity;

    private Double price;

    private Boolean status;

}
