package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
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

    private Long userId;

    private Long deliveryId;

    private Long paymentId;

    private Long addressId;

    private Long voucherId;

    private Long StatusId;

    private Date deliveryDate;

    private Date receivedDate;

    private String categoryOrder;

    private Double orderTotal;

    private Double orderTotalInitial; //tổng tiền ban đầu

    private Double discountMoney; // tiền giảm giá

    private String note;

//    @NotBlank(message = "Tên người nhận không được để trống!")
    private String recipientName;

//    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

//    @NotBlank(message = "Địa chỉ không được để trống!")
    private String addressDetail;

//    @NotBlank(message = "Phường/xã không được để trống!")
    private String region;

//    @NotBlank(message = "Quận/huyện phố không được để trống!")
    private  String district;
//
//    @NotBlank(message = "Tỉnh/thành phố không được để trống!")
    private String city;
}
