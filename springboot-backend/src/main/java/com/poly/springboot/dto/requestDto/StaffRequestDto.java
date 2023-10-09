package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StaffRequestDto {


    private Long idPosition;

    @NotBlank(message = "Vui lòng nhập họ!")
    private String firstName;

    @NotBlank(message = "Vui lòng nhập tên!")
    private String lastName;

    private String avatar;

    @NotBlank(message = "Vui lòng nhập số điện thoại!")
    private String numberPhone;

    @NotBlank(message = "Vui lòng nhập email!")
    private String email;

    private Boolean gender;

    @NotBlank(message = "Vui lòng nhập ngày sinh!")
    private Date birthOfDate;

    @NotBlank(message = "Vui lòng nhập địa chỉ!")
    private String address;

    @NotBlank(message = "Vui lòng nhập thành phố!")
    private String city;

    @NotBlank(message = "Vui lòng nhập quốc gia!")
    private String country;

    @NotBlank(message = "Vui lòng nhập mật khẩu!")
    private String password;
}
