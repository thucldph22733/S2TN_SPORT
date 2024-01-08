package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailInStoreRequestDto {

    private Long productDetailId;

    private Long orderId;

    private Integer quantity;

    private Double price;
}
