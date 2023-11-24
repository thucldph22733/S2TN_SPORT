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
public class MaterialRequestDto {

    @NotBlank(message = "Tên chất liệu không được để trống!")
    private String materialName;

    private String materialDescribe;

    private Boolean deleted;
}
