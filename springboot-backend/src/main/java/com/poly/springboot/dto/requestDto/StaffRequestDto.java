package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StaffRequestDto {


    private Long roleId;

    @NotBlank(message = "Vui lòng nhập họ và tên!")
    private String staffName;

    private String avatar;

    @NotBlank(message = "Vui lòng nhập số điện thoại!")
    private String phoneNumber;

    @NotBlank(message = "Vui lòng nhập địa chỉ email!")
    private String email;

    @NotNull (message = "Vui lòng chọn giới tính!")
    private Boolean gender;

    private Date birthOfDay;

    @NotBlank(message = "Vui lòng nhập địa chỉ!")
    private String address;

    @NotBlank(message = "Vui lòng nhập thành phố!")
    private String city;

    @NotBlank(message = "Vui lòng nhập quốc gia!")
    private String country;

    @NotBlank(message = "Vui lòng nhập mật khẩu!")
    private String password;

    private Integer status;
}
