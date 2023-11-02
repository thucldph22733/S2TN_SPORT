package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponeDto {

    private  Long id;

    private String customerName;

    private String avatar;

    private String numberPhone;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private Integer customerStatus;

}
