package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private Long userId;

    private Long voucherId;

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

    private List<OrderDetailRequestDto> orderDetail;

}
