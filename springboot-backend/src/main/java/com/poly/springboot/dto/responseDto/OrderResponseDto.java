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

    private Long idUser;

    private String userName;

    private String phoneNumber;

    private String payment;

    private String addressDetail;   // so nha, ngo, duong

    private String recipientName;

    private String ward;// phuong/ xa

    private String district;//quan/ huyen

    private String city;  //tinh/thanh pho

    private String voucherName;

    private String statusName;

    private String note;

    private Double orderTotal;

    private Double orderTotalInitial; //tổng tiền ban đầu

}
