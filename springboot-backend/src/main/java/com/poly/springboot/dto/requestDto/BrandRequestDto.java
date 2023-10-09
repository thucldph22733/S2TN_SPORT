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
    @NotBlank(message = "Vui lòng nhập tên thương hiệu!")
    private String brandName;

    @NotBlank(message = "Không được để trống!")
    private String brandDescribe;
}
