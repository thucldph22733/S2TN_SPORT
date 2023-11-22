package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandRequestDto {

    @NotBlank(message = "Tên thương hiệu không được để trống!")
    private String brandName;

    private String brandDescribe;

    private Boolean deleted;
}
