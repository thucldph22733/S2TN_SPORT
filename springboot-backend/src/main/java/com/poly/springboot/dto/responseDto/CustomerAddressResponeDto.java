package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.Address;
import com.poly.springboot.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAddressResponeDto {
    private Long id;

    private Customer customer;

    private Address address;

    private Integer isDefault;
}
