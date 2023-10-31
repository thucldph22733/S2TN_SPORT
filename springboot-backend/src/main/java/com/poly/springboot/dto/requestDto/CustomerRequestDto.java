package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequestDto {

    @NotBlank(message = "Tên khách hàng không được để trống!")
    private String customerName;

    private String avatar;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotBlank(message = "Email không được để trống!")
    private String email;

    private Boolean gender;

    private Date birthOfDay;

    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    private Integer status;

}
