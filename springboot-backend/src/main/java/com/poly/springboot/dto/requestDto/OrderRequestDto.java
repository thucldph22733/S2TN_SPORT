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

    private Long deliveryId;

    private Long paymentId;

    private Long addressId;

    private Long StatusId;

    private Date deliveryDate;

    private Date receivedDate;

    private String categoryOrder;

    private String orderTotal;

    private String note;
}
