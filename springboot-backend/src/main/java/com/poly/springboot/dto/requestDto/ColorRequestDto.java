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
public class ColorRequestDto {
    @NotBlank(message = "Vui lòng nhập tên Mau!")
    private String colorName;

    @NotBlank(message = "Không được để trống!")
    private String colorDescribe;
}
