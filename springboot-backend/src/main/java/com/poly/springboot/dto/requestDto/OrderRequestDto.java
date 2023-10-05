package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private Long staffId;

    private Long customerId;

    private Long shippingId;

    private Long paymentId;

    private Long shipperId;

    private Long StatusId;

    private Date deliveryDate;

    private Date receivedDate;

    private String note;
}
