package com.poly.springboot.dto.responseDto;

import jakarta.persistence.Column;
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

    private Long idVoucher;

    private Long idCustomer;

    private LocalDateTime orderDate;

    private String staffName;

    private String customerName;

    private String phoneNumber;

    private String shippingName;

    private String payment;

    private String address;

    private String voucherName;

    private String statusName;

    private Date deliveryDate;

    private Date receivedDate;

    private String categoryOrder;

    private String note;

    private Double orderTotal;

    private Double orderTotalInitial; //tổng tiền ban đầu

    private Double discountMoney; // tiền giảm giá
}
