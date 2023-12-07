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

    @NotBlank(message = "Tên màu sắc không được để trống!")
    private String colorName;

    private String colorDescribe;

    private Boolean deleted;
}
