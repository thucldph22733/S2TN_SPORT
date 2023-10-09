package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
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

    private Long materialId;

    private Long sizeId;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer quantity;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Double price;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Double promotionPrice;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private String createBy;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private String updateBy;
}
