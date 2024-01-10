package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderInStoreRequestDto {

    private Long orderId;

    private String statusName;

    private Double orderTotal;

    private String note;

    private Integer transportFee;

    private String recipientName;

    private String phoneNumber;

    private String addressDetail;

    private String ward;

    private  String district;

    private String city;
}
