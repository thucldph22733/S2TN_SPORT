package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.OrderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private Long userId;

    private Long deliveryId;

    private Long voucherId;

    private Long statusId;

    private Double orderTotal;

//    private Double orderTotalInitial;

    private String note;

    private OrderType orderType;

//    @NotBlank(message = "Tên người nhận không được để trống!")
    private String recipientName;

//    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

//    @NotBlank(message = "Địa chỉ không được để trống!")
    private String addressDetail;

//    @NotBlank(message = "Phường/xã không được để trống!")
    private String ward;

//    @NotBlank(message = "Quận/huyện phố không được để trống!")
    private  String district;
//
//    @NotBlank(message = "Tỉnh/thành phố không được để trống!")
    private String city;

}
