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
public class ClubRequestDto {

    @NotBlank(message = "Vui lòng nhập tên Club!")
    private String clubName;

    @NotBlank(message = "Không được để trống!")
    private String clubDescribe;
}
