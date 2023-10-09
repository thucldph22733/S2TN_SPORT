package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;

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

    private String paymentName;

    private String shipperName;

    private String StatusName;

    private Date deliveryDate;

    private Date receivedDate;

    private String note;
}
