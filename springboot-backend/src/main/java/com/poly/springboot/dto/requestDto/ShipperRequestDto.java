package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShipperRequestDto {

    @NotBlank(message = "Vui lòng nhập tên!")
    private String shipperName;

    @NotBlank(message = "Vui lòng nhập số điện thoại!")
//    @Pattern(regexp = "^\\d{10}$",message = "Vui lòng nhập đúng định dạng số điện thoại!")
    private String phoneNumber;

    @NotBlank(message = "Vui lòng nhập số địa chỉ!")
    private String address;

    private String shipperDescribe;
}
