package com.poly.springboot.dto.requestDto;

//import com.poly.springboot.entity.Role;
import lombok.*;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {

//    @NotBlank(message = "Tên nhân viên không được để trống!")
    private String userName;

//    private String avatar;

//    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

//    @NotBlank(message = "Địa chỉ email không được để trống!")
    private String email;

//    @NotNull(message = "Vui lòng chọn giới tính!")
    private Boolean gender;

//    @NotNull(message = "Ngày sinh không được để trống!")
    private Date birthOfDay;

//    @NotBlank(message = "Địa chỉ không được để trống!")
    private String address;

//    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    private Boolean status;

//    private Role role;
}
