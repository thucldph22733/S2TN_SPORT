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

    @NotEmpty(message = "Số lượng không được để trống!")
    private Integer quantity;

    @NotEmpty(message = "Tên giá không được để trống!")
    private Double price;

    private Double promotionPrice;

    private Boolean status;

    private String createBy;

    private String updateBy;
}
