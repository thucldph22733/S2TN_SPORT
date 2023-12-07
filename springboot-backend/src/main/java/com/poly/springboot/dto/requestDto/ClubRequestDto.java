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

    private String typeClub;

    @NotBlank(message = "Tên câu lạc bộ không được để trống!")
    private String clubName;

    private String clubDescribe;

    private Boolean deleted;
}
