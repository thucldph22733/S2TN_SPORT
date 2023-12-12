package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {

    @NotBlank(message = "Tên sản phẩm không được để trống!")
    private String productName;

    private String categoryName;

    private String brandName;

    private String supplierName;

    private Boolean productHot;

    private Boolean productSale;

    private Boolean productNew;

    private String productDescribe;

    private Boolean deleted;

}
