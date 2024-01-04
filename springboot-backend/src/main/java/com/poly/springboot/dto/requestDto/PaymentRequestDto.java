package com.poly.springboot.dto.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {

    private Long orderId;

    private LocalDateTime paymentDate;

    private Double amount ;

    private String paymentMethod;

    private String note;

    private String status;
}
