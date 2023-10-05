package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.Position;
import com.poly.springboot.entity.Store;
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

    private Store store;

    private Position position;

    private String firstName;

    private String lastName;

    private String avata;

    private String numberPhone;

    private String email;

    private Boolean gender;

    private Date birthOfDate;

    private String address;

    private String city;

    private String country;

    private String password;

}
