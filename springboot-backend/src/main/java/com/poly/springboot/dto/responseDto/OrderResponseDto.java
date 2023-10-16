package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long id;

    private LocalDateTime orderDate;

    private String staffName;

    private String customerName;

    private String shippingName;

    private String payment;

    private String address;

    private String StatusName;

    private Date deliveryDate;

    private Date receivedDate;

    private String categoryOrder;

    private String note;
}
