package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class ShippingMethodResponseDto {

    private Long id;

    private String shippingName;

    private Double price;

    private String shippingDescribe;

}
