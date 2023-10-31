package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDto {

    private  Long id;

    private String customerName;

    private String avatar;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private Integer status;

}
