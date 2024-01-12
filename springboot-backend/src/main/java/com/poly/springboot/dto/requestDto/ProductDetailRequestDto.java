package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailRequestDto {

    private Long productId;

    private Long colorId;

    private Long sizeId;

    private Long materialId;

    private Integer quantity;

    private Double price;

}
