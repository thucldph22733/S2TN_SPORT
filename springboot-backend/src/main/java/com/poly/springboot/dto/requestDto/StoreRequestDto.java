package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoreRequestDto {

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
