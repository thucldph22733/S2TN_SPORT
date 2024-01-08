package com.poly.springboot.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.poly.springboot.entity.Role;
import lombok.*;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {

    @JsonIgnore
    private Long id;

    private String userName;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private String password;

    private Boolean deleted;

    private Role role;

}
