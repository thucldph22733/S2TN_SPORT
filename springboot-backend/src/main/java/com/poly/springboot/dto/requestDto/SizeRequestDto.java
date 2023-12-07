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
public class SizeRequestDto {

    @NotBlank(message = "Tên kích thước không được để trống!")
    private String sizeName;

    private String sizeDescribe;

    private Boolean deleted;
}
