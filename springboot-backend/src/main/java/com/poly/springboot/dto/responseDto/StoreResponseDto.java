package com.poly.springboot.dto.responseDto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreResponseDto {
    private Long id;

    private String storeName;

    private String numberPhone;

    private String email;

    private String street;

    private String city;

    private String country;

    private String startTime;

    private String endTime;

    private String storeDescribe;
}
