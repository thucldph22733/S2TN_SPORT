package com.poly.springboot.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {

    @JsonIgnore
    private Long id;
//    @NotBlank(message = "Tên nhân viên không được để trống!")
    private String userName;

//    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

//    @NotBlank(message = "Địa chỉ email không được để trống!")
    private String email;

//    @NotNull(message = "Vui lòng chọn giới tính!")
    private Boolean gender;

//    @NotNull(message = "Ngày sinh không được để trống!")
    private Date birthOfDay;

//    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    private Boolean deleted;

    private List<String> roleList;

}
