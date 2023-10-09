package com.poly.springboot.dto.responseDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PositionResponseDto {
    private Long id;

    private String positionName;

    private String positionDescribe;
}
