package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDto {

    private String address;


    private String street;


    private String region;


    private String city;


    private String coutry;


}
