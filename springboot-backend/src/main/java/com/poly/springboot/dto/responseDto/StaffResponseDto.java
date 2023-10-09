package com.poly.springboot.dto.responseDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StaffResponseDto {

    private Long id;

    private String positionName;

    private String firstName;

    private String lastName;

    private String avatar;

    private String numberPhone;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private String address;

    private String city;

    private String country;

    private String password;

}
