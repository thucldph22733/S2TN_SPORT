package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryRequestDto {

    @NotBlank(message = "Tên phương thức giao hàng không được để trống!")
    private String shippingName;

    @NotBlank(message = "Giá phương thức giao hàng không được để trống!")
    private Double price;

    private String shippingDescribe;
}
