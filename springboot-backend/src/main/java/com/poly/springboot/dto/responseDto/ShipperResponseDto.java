package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShipperResponseDto {

    private Long id;

    private String shipperName;

    private String phoneNumber;

    private String address;

    private String shipperDescribe;
}
