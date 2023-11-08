package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {

    @NotBlank(message = "Tên phương thức thanh toán không được để trống!")
    private String paymentName;

    private String paymentDescribe;
}
