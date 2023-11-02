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

    @NotBlank(message = "Tên nhân viên không được để trống!")
    private String staffName;

    private String avatar;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotBlank(message = "Địa chỉ email không được để trống!")
    private String email;

    @NotNull(message = "Vui lòng chọn giới tính!")
    private Boolean gender;

    @NotNull(message = "Ngày sinh không được để trống!")
    private Date birthOfDay;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String address;

    @NotBlank(message = "tên thành phố không được để trống!")
    private String city;

    @NotBlank(message = "Quốc gia không được để trống!")
    private String country;

    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    private Integer status;
}
