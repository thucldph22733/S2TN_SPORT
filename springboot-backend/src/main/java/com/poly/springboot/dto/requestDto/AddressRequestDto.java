package com.poly.springboot.dto.requestDto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDto {

    @NotBlank(message = "Tên người nhận không được để trống!")
    private String recipientName;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String addressDetail;

    @NotBlank(message = "Phường/xã không được để trống!")
    private String ward;

    @NotBlank(message = "Quận/huyện phố không được để trống!")
    private  String district;

    @NotBlank(message = "Tỉnh/thành phố không được để trống!")
    private String city;

    private Boolean deleted;

    private Long usersId;

}
