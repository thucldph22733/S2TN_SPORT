package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerAddressResponseDto {

    private Long id;

    private String recipientName;

    private String phoneNumber;

    private String addressDetail;

    private String region;

    private  String district;

    private String city;

    private Integer isDefault;
}
